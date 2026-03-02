//package com.example.PdfBackend.repository;
//
//import com.example.PdfBackend.model.Idea;
//import org.springframework.data.mongodb.repository.MongoRepository;
//
//public interface IdeaRepository extends MongoRepository<Idea, String> {
//}


package com.example.PdfBackend.repository;

import com.example.PdfBackend.model.Idea;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface IdeaRepository extends MongoRepository<Idea, String> {

    boolean existsByTitle(String title);
}