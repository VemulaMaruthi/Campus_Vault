package com.example.PdfBackend.repository;

import com.example.PdfBackend.model.StudentProfile;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface StudentProfileRepository extends MongoRepository<StudentProfile, String> {
    boolean existsByRollNumber (String rollNumber);
    Optional<StudentProfile> findByRollNumber (String rollNumber);
    long countByRole(com.example.PdfBackend.model.Role role);
    List<StudentProfile> findAllByRollNumberIn(Collection<String> rollNumbers);
}
