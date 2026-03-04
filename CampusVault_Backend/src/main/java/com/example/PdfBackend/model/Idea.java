package com.example.PdfBackend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document(collection = "ideas")
public class Idea {

    @Id
    private String id;
    private String category;
    private String title;
    private String description;
    private String createdByName;
    private LocalDateTime createdAt;
    private String createdByBranch;
    private String createdByYear;

    // ✅ Added — needed for frontend cooldown & sorting by student
    private String createdById;

    // ✅ Added — needed for email button to reach idea author
    private String createdByEmail;

    private int likes = 0;

    // ✅ Fixed: was "LikedBy" (capital L) — Jackson was serializing as "LikedBy"
    // which broke frontend likedBy checks. Must be camelCase.
    private List<String> likedBy = new ArrayList<>();

    private List<Comment> comments = new ArrayList<>();
}