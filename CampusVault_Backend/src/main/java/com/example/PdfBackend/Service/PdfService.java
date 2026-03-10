package com.example.PdfBackend.Service;

import com.mongodb.client.gridfs.model.GridFSFile;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class PdfService {

    private final GridFsTemplate gridFsTemplate;
    private final GridFsOperations gridFsOperations;

    public PdfService(GridFsTemplate gridFsTemplate, GridFsOperations gridFsOperations) {
        this.gridFsTemplate = gridFsTemplate;
        this.gridFsOperations = gridFsOperations;
    }

    // ✅ Upload — tag as type=notes
    public String uploadFile(MultipartFile file, String domain) throws IOException {
        Document metaData = new Document();
        metaData.put("domain", domain);
        metaData.put("type", "notes"); // ✅ tag so it's separate from papers

        ObjectId id = gridFsTemplate.store(
                file.getInputStream(),
                file.getOriginalFilename(),
                file.getContentType(),
                metaData
        );
        return id.toString();
    }

    // ✅ List only notes (type=notes)
    public List<GridFSFile> listFiles() {
        Query query = new Query(Criteria.where("metadata.type").is("notes"));
        return gridFsTemplate.find(query).into(new ArrayList<>());
    }

    // Download/View by ID
    public GridFsResource downloadFile(String id) throws IOException {
        GridFSFile file = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(id)));
        if (file != null) {
            return gridFsOperations.getResource(file);
        }
        return null;
    }

    // Delete by ID
    public void deleteFile(String id) {
        gridFsTemplate.delete(new Query(Criteria.where("_id").is(id)));
    }
}