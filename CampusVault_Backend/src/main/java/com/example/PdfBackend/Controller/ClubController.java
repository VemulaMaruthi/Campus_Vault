package com.example.PdfBackend.Controller;

import com.example.PdfBackend.DTO.ClubRequest;
import com.example.PdfBackend.DTO.ClubResponse;
import com.example.PdfBackend.Service.ClubService;
import com.example.PdfBackend.model.ClubRole;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clubs")
@RequiredArgsConstructor
public class ClubController {

    private final ClubService clubService;

    @PostMapping("/create")
    public ResponseEntity<ClubResponse> createClub(
            @RequestBody ClubRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                clubService.createClub(request, userDetails.getUsername())
        );
    }

    @GetMapping("/all")
    public ResponseEntity<List<ClubResponse>> getAllClubs() {
        return ResponseEntity.ok(clubService.getAllClubs());
    }

    @GetMapping("/my")
    public ResponseEntity<List<ClubResponse>> getMyClubs(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                clubService.getMyClubs(userDetails.getUsername())
        );
    }

    @DeleteMapping("/{clubId}")
    public ResponseEntity<String> deleteClub(
            @PathVariable String clubId,
            @AuthenticationPrincipal UserDetails userDetails) {
        clubService.deleteClub(clubId, userDetails.getUsername());
        return ResponseEntity.ok("Club deleted successfully");
    }

    // ✅ Join a club
    @PostMapping("/{clubId}/join")
    public ResponseEntity<ClubResponse> joinClub(
            @PathVariable String clubId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                clubService.joinClub(clubId, userDetails.getUsername())
        );
    }

    // ✅ Leave a club
    @PostMapping("/{clubId}/leave")
    public ResponseEntity<ClubResponse> leaveClub(
            @PathVariable String clubId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                clubService.leaveClub(clubId, userDetails.getUsername())
        );
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getClubCount() {
        return ResponseEntity.ok(clubService.getClubCount());
    }

    @PutMapping("/{clubId}/members/{rollNumber}/role")
    public ResponseEntity<ClubResponse> assignRole(
            @PathVariable String clubId,
            @PathVariable String rollNumber,
            @RequestParam ClubRole role,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                clubService.assignRole(clubId, rollNumber, role, userDetails.getUsername())
        );
    }
}