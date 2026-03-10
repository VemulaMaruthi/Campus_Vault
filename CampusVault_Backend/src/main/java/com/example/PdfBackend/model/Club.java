package com.example.PdfBackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Clubs")
public class Club {

    @Id
    private String id;

    private String title;
    private String description;
    private String linkedinUrl;

    // Creator info
    private String createdBy;        // rollNumber
    private String createdByName;    // student name

    // Timestamp
    private LocalDateTime createdAt;

    private List<String> members = new ArrayList<>();

    // ✅ Map of rollNumber -> ClubRole (PRESIDENT, VICE_PRESIDENT, MEMBER)
    private Map<String, ClubRole> memberRoles = new HashMap<>();

    // ✅ Max members allowed
    private static final int MAX_MEMBERS = 20;

    public boolean isFull() {
        return members.size() >= MAX_MEMBERS;
    }

    public boolean hasMember(String rollNumber) {
        return members.contains(rollNumber);
    }

    // ✅ Get role of a member, defaults to MEMBER if not found
    public ClubRole getRole(String rollNumber) {
        return memberRoles.getOrDefault(rollNumber, ClubRole.MEMBER);
    }

    // ✅ Check if a VP already exists (excluding a specific rollNumber)
    public boolean hasVicePresident(String excludeRollNumber) {
        return memberRoles.entrySet().stream()
                .anyMatch(e -> e.getValue() == ClubRole.VICE_PRESIDENT
                        && !e.getKey().equals(excludeRollNumber));
    }
}