package com.example.PdfBackend.Controller;

import com.example.PdfBackend.Service.PdfService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/notes")
public class PdfController {

    private final PdfService pdfService;

    public PdfController (PdfService pdfService) {
        this.pdfService = pdfService;
    }

    // This is used to update the pdf
    @PostMapping("/upload")
    public ResponseEntity<?> uploadPdf (
            @RequestParam("file")MultipartFile multipartFile,
            @RequestParam("domain") String domain ) {
        try {
            String id = pdfService.uploadFile(multipartFile, domain);
             return ResponseEntity.ok(Map.of(
                     "message", "File uploaded successfully",
                     "id", id,
                     "domain", domain
             ));

        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error",e.getMessage()));
        }
    }

    // This method is used to give list of pdf's
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> listFiles(@RequestParam(required = false) String domain) {
        List<Map<String, Object>> files = pdfService.listFiles().stream()
                .filter(file -> {
                    if (domain == null || domain.isEmpty()) return true;
                    String fileDomain = (file.getMetadata() != null && file.getMetadata().get("domain") != null)
                            ? file.getMetadata().get("domain").toString()
                            : "";
                    return fileDomain.equalsIgnoreCase(domain);
                })
                .map(file -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", file.getObjectId().toString());
                    map.put("filename", file.getFilename());
                    map.put("domain", file.getMetadata() != null ? file.getMetadata().get("domain") : null);
                    map.put("uploadDate", file.getUploadDate());
                    return map;
                })
                .collect(Collectors.toList());

        return ResponseEntity.ok(files);
    }

    // This method is used to give particular pdf based on mongodb id
    @GetMapping("/view/{id}")
    public ResponseEntity<?> viewFile(@PathVariable String id) throws IOException {
        GridFsResource resource = pdfService.downloadFile(id);
        if (resource == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(resource.getInputStream()));
    }

    // This method is used to download the pdf
    @GetMapping("/download/{id}")
    public ResponseEntity<?> downloadFile(@PathVariable String id) throws IOException {
        GridFsResource resource = pdfService.downloadFile(id);
        if (resource == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(resource.getInputStream()));
    }

    // This method is used to delete the pdf
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFile(@PathVariable String id) {
        pdfService.deleteFile(id);
        return ResponseEntity.ok(Map.of("message", "File deleted successfully"));
    }
}
