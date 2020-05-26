package com.ssafy.backspring.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.ssafy.backspring.model.dto.FileUploadResponse;
import com.ssafy.backspring.model.service.FileUploadDownloadService;

@RestController
public class FileUploadController {
    private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);
    
    @Autowired
    private FileUploadDownloadService service;
    
    @GetMapping("/")
    public String controllerMain() {
        return "Hello~ File Upload Test.";
    }
    
    @PostMapping("/uploadFile")
    public FileUploadResponse uploadFile(@RequestParam("file") MultipartFile file, String distingishString) {
        String fileName = service.storeFile(file, distingishString);
        
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                                .path("/downloadFile/")
                                .path(fileName)
                                .toUriString();
        
        return new FileUploadResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());
    }
    
    @PostMapping("/uploadMultipleFiles")
    public List<FileUploadResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files, String distingishString){
    	
        return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(file, distingishString))
                .collect(Collectors.toList());
    }
    
    @GetMapping("/downloadFile/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request){
         // Load file as Resource
        Resource resource = service.loadFileAsResource(fileName);
 
        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }
 
        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }
 
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}