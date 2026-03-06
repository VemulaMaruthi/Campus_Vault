//package com.example.PdfBackend.model;
//
//public class Comment {
//    private String name;
//    private String year;
//    private String branch;
//    private String text;
//
//    public String getName() { return name; }
//    public String getYear() { return year; }
//    public String getBranch() { return branch; }
//    public String getText() { return text; }
//
//    public void setName(String name) { this.name = name; }
//    public void setYear(String year) { this.year = year; }
//    public void setBranch(String branch) { this.branch = branch; }
//    public void setText(String text) { this.text = text; }
//}


package com.example.PdfBackend.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    @Id
    private String id;
    private String comment;
    private String commentedBy;
    private String commentedYear;
    private String commentedBranch;
    private LocalDateTime commentAt;
    private String ownerRoll;
    private int likes = 0;
    private List<String> likedBy = new ArrayList<>();
}