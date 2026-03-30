package com.example.PdfBackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class ClubResponse {
    private String id;
    private String title;
    private String description;
    private String linkedinUrl;
    private String createdBy;        // rollNumber
    private String createdByName;    // student name
    private LocalDateTime createdAt;

    private List<String> members;
    private List<MemberInfo> memberDetails; 
    private int memberCount;           // how many joined
    private boolean isFull;
}