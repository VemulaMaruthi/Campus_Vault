package com.example.PdfBackend.Controller;

import com.example.PdfBackend.DTO.IdeaCommentResponse;
import com.example.PdfBackend.DTO.IdeaDto.IdeaRequest;
import com.example.PdfBackend.DTO.IdeaDto.IdeaResponses;
import com.example.PdfBackend.DTO.CommentDto.CommentRequest;
import com.example.PdfBackend.Service.IdeaService;
import com.example.PdfBackend.Service.CommentService;
import com.example.PdfBackend.model.Idea;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ideas")
@CrossOrigin
public class IdeaController {

    private final IdeaService ideaService;
    private final CommentService commentService;

    public IdeaController(IdeaService ideaService, CommentService commentService) {
        this.ideaService = ideaService;
        this.commentService = commentService;
    }

    // ✅ GET ALL IDEAS
    @GetMapping
    public List<Idea> getAllIdeas() {
        return ideaService.getAllIdea();
    }

    // ✅ CREATE IDEA
    @PostMapping("/create")
    public ResponseEntity<IdeaResponses> createIdea(
            @RequestBody IdeaRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                ideaService.createIdea(request, userDetails.getUsername())
        );
    }

    // ✅ LIKE IDEA
    @PostMapping("/{id}/like")
    public ResponseEntity<IdeaResponses> likeIdea(
            @PathVariable String id,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                ideaService.likeIdea(id, userDetails.getUsername())
        );
    }

    // ✅ ADD COMMENT
    @PostMapping("/{id}/comment")
    public ResponseEntity<IdeaCommentResponse> addComment(
            @PathVariable String id,
            @RequestBody CommentRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        request.setIdeaId(id);
        return ResponseEntity.ok(
                commentService.createComment(request, userDetails.getUsername())
        );
    }

    // ✅ DELETE COMMENT
    @DeleteMapping("/{ideaId}/comment/{commentId}")
    public ResponseEntity<IdeaCommentResponse> deleteComment(
            @PathVariable String ideaId,
            @PathVariable String commentId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(
                commentService.deleteComment(ideaId, commentId, userDetails.getUsername())
        );
    }
}