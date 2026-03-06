package com.example.PdfBackend.Service;

import com.example.PdfBackend.CustomException.ForbiddenException;
import com.example.PdfBackend.CustomException.NotFoundException;
import com.example.PdfBackend.DTO.IdeaDto.IdeaRequest;
import com.example.PdfBackend.DTO.IdeaDto.IdeaResponses;
import com.example.PdfBackend.model.Idea;
import com.example.PdfBackend.model.StudentProfile;
import com.example.PdfBackend.repository.IdeaRepository;
import com.example.PdfBackend.repository.StudentProfileRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class IdeaService {

    private final IdeaRepository ideaRepository;
    private final StudentProfileRepository studentProfileRepository;

    public IdeaService(IdeaRepository ideaRepository, StudentProfileRepository studentProfileRepository) {
        this.ideaRepository = ideaRepository;
        this.studentProfileRepository = studentProfileRepository;
    }

    public List<IdeaResponses> getAllIdea() {
        return ideaRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(java.util.stream.Collectors.toList());
    }

    public IdeaResponses createIdea(IdeaRequest request, String rollNumber) {
        StudentProfile student = studentProfileRepository.findByRollNumber(rollNumber)
                .orElseThrow(() -> new NotFoundException("Student not found " + rollNumber));

        if (ideaRepository.existsByTitle(request.getTitle())) {
            throw new ForbiddenException("You already have an idea with this title");
        }

        Idea idea = new Idea();
        idea.getId();
        idea.setCategory(request.getCategory());
        idea.setTitle(request.getTitle());
        idea.setDescription(request.getDescription());
        idea.setCreatedAt(LocalDateTime.now());
        idea.setCreatedByName(student.getName());
        idea.setCreatedByBranch(student.getBranch());
        idea.setCreatedByYear(student.getYear());
        idea.setCreatedById(student.getRollNumber());   // ✅ add this
        idea.setCreatedByEmail(student.getEmail());

        return mapToResponse(ideaRepository.save(idea));
    }

    public IdeaResponses likeIdea(String ideaId, String rollNumber) {
        Idea idea = ideaRepository.findById(ideaId)
                .orElseThrow(() -> new NotFoundException("Idea not found: " + ideaId));

        if (idea.getLikedBy() == null) idea.setLikedBy(new ArrayList<>());

        if (idea.getLikedBy().contains(rollNumber)) {
            // Already liked → UNLIKE
            idea.getLikedBy().remove(rollNumber);
            idea.setLikes(Math.max(0, idea.getLikes() - 1)); // prevent going below 0
        } else {
            // Not liked yet → LIKE
            idea.getLikedBy().add(rollNumber);
            idea.setLikes(idea.getLikes() + 1);
        }

        return mapToResponse(ideaRepository.save(idea));
    }


    // ✅ mapToResponse now includes comments
    public IdeaResponses mapToResponse(Idea idea) {
        return new IdeaResponses(
                idea.getId(),
                idea.getTitle(),
                idea.getCategory(),
                idea.getDescription(),
                idea.getCreatedAt(),
                idea.getCreatedByName(),
                idea.getCreatedByBranch(),
                idea.getCreatedByYear(),
                idea.getCreatedById(),      // ✅ new
                idea.getCreatedByEmail(),   // ✅ new
                idea.getLikes(),
                idea.getLikedBy(),
                idea.getComments() != null ? idea.getComments() : new ArrayList<>() // ✅
        );
    }

    public void deleteById(String ideaId, String rollNumber) {
        Idea idea = ideaRepository.findById(ideaId)
                .orElseThrow(() -> new NotFoundException("Idea not found: " + ideaId));

        // ✅ Guard against old ideas with null createdById
        if (idea.getCreatedById() == null || !idea.getCreatedById().equals(rollNumber)) {
            throw new ForbiddenException("You can only delete your own idea");
        }

        ideaRepository.deleteById(ideaId);
    }
}