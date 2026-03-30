package com.example.PdfBackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MemberInfo {
    private String rollNumber;
    private String name;
    private String year;
    private String branch;
    private String linkedinUrl;
}
