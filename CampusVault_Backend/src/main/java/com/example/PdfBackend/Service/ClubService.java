package com.example.PdfBackend.Service;

import com.example.PdfBackend.CustomException.ForbiddenException;
import com.example.PdfBackend.CustomException.NotFoundException;
import com.example.PdfBackend.DTO.ClubRequest;
import com.example.PdfBackend.DTO.ClubResponse;
import com.example.PdfBackend.DTO.MemberInfo;
import com.example.PdfBackend.model.Club;
import com.example.PdfBackend.model.ClubRole;
import com.example.PdfBackend.model.StudentProfile;
import com.example.PdfBackend.repository.ClubRepository;
import com.example.PdfBackend.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubRepository clubRepository;
    private final StudentProfileRepository studentRepository;

    public ClubResponse createClub(ClubRequest request, String rollNumber) {
        StudentProfile student = studentRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new NotFoundException("Student not found: " + rollNumber));

        if (clubRepository.existsByTitleAndCreatedBy(request.getTitle().trim(), rollNumber)) {
            throw new ForbiddenException("You already have a club with this title");
        }

        Club club = new Club();
        club.setId(rollNumber);
        club.setTitle(request.getTitle().trim());
        club.setDescription(request.getDescription().trim());
        club.setLinkedinUrl(request.getLinkedinUrl().trim());
        club.setCreatedBy(rollNumber);
        club.setCreatedByName(student.getName());
        club.setCreatedAt(LocalDateTime.now());

        // ✅ Auto-assign PRESIDENT role to creator
        club.getMemberRoles().put(rollNumber, ClubRole.PRESIDENT);

        return mapToResponse(clubRepository.save(club));
    }

    public List<ClubResponse> getAllClubs() {
        return clubRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ClubResponse> getMyClubs(String rollNumber) {
        return clubRepository.findByCreatedBy(rollNumber)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public void deleteClub(String clubId, String rollNumber) {
        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new NotFoundException("Club not found: " + clubId));

        if (!club.getCreatedBy().equals(rollNumber)) {
            throw new ForbiddenException("You can only delete your own club");
        }

        clubRepository.deleteById(clubId);
    }

    public ClubResponse joinClub(String clubId, String rollNumber) {
        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new NotFoundException("Club not found: " + clubId));

        if (club.getCreatedBy().equals(rollNumber)) {
            throw new ForbiddenException("You cannot join your own club");
        }
        if (club.hasMember(rollNumber)) {
            throw new ForbiddenException("You have already joined this club");
        }
        if (club.isFull()) {
            throw new ForbiddenException("This club is full (max 20 members)");
        }

        long joinedCount = clubRepository.countByMembersContaining(rollNumber);
        if (joinedCount >= 3) {
            throw new ForbiddenException("You can only join up to 3 clubs");
        }

        // ✅ Add member and assign default MEMBER role
        club.getMembers().add(rollNumber);
        club.getMemberRoles().put(rollNumber, ClubRole.MEMBER);

        return mapToResponse(clubRepository.save(club));
    }

    public ClubResponse leaveClub(String clubId, String rollNumber) {
        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new NotFoundException("Club not found: " + clubId));

        if (!club.hasMember(rollNumber)) {
            throw new ForbiddenException("You are not a member of this club");
        }

        // ✅ Remove member and their role
        club.getMembers().remove(rollNumber);
        club.getMemberRoles().remove(rollNumber);

        return mapToResponse(clubRepository.save(club));
    }

    // ✅ Assign role to a member — only President can do this
    public ClubResponse assignRole(String clubId, String targetRollNumber,
                                   ClubRole role, String requesterRollNumber) {
        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new NotFoundException("Club not found: " + clubId));

        // Only the president (creator) can assign roles
        if (!club.getCreatedBy().equals(requesterRollNumber)) {
            throw new ForbiddenException("Only the President can assign roles");
        }

        // Target must be a member of the club
        if (!club.hasMember(targetRollNumber)) {
            throw new ForbiddenException("This student is not a member of the club");
        }

        // Cannot change the president's own role
        if (targetRollNumber.equals(club.getCreatedBy())) {
            throw new ForbiddenException("Cannot change the President's role");
        }

        // Cannot assign PRESIDENT role to anyone else
        if (role == ClubRole.PRESIDENT) {
            throw new ForbiddenException("Cannot assign President role to another member");
        }

        // Only 1 VP allowed — check if another member already holds VP
        if (role == ClubRole.VICE_PRESIDENT && club.hasVicePresident(targetRollNumber)) {
            throw new ForbiddenException("A Vice President already exists in this club");
        }

        club.getMemberRoles().put(targetRollNumber, role);
        return mapToResponse(clubRepository.save(club));
    }

    public long getClubCount() {
        return clubRepository.count();
    }

    private ClubResponse mapToResponse(Club club) {
        List<MemberInfo> memberDetails = club.getMembers().stream()
                .map(rollNumber -> {
                    StudentProfile student = studentRepository.findByRollNumber(rollNumber)
                            .orElse(null);

                    String name   = student != null ? student.getName()   : "Unknown";
                    String year   = student != null ? student.getYear()   : "-";
                    String branch = student != null ? student.getBranch() : "-";

                    String linkedinUrl = clubRepository.findByCreatedBy(rollNumber)
                            .stream()
                            .findFirst()
                            .map(Club::getLinkedinUrl)
                            .orElse(null);

                    // ✅ Get this member's role from the map
                    String role = club.getRole(rollNumber).name();

                    return new MemberInfo(rollNumber, name, year, branch, linkedinUrl, role);
                })
                .collect(Collectors.toList());

        return new ClubResponse(
                club.getId(),
                club.getTitle(),
                club.getDescription(),
                club.getLinkedinUrl(),
                club.getCreatedBy(),
                club.getCreatedByName(),
                club.getCreatedAt(),
                club.getMembers(),
                memberDetails,
                club.getMembers().size(),
                club.isFull()
        );
    }
}