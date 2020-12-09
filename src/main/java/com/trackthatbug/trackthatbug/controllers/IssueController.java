package com.trackthatbug.trackthatbug.controllers;

import com.trackthatbug.trackthatbug.models.Issue;
import com.trackthatbug.trackthatbug.models.Result;
import com.trackthatbug.trackthatbug.repositories.IssueRepository;
import com.trackthatbug.trackthatbug.services.NextSequenceService;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.*;
import java.security.Principal;
import java.time.ZonedDateTime;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@RestController
public class IssueController {
    private IssueRepository issueRepository;
    private NextSequenceService nextSequenceService;

    @CrossOrigin(origins = "http://localhost:8080")
    @PostMapping(value = "/createIssue", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Result<Issue>> createIssue(@RequestPart("properties") @Valid Issue issue,
                                              @RequestPart("files") MultipartFile[] files, BindingResult bindingResult, Principal principal){
        Result<Issue> createdIssue = new Result<Issue>();
        String user = principal.getName();
        issue.setUser(user);
        issue.setCreatedBy(user);
        issue.setCreatedOn(new Date());
        issue.setIssueNumber(nextSequenceService.getNextSequence("CustomSequence"));

        if(files.length > 0){
            try {
                issue.setFile(new Binary(BsonBinarySubType.BINARY, files[0].getBytes()));
            } catch(IOException e){
                //if file fails to load show error
                createdIssue.setPayload(issue);
                return new ResponseEntity<>(createdIssue, HttpStatus.BAD_REQUEST);
            }
        }

        issueRepository.save(issue);

        createdIssue.setPayload(issue);
        return new ResponseEntity<>(createdIssue, HttpStatus.OK);
    }

    @GetMapping(value = "/getIssue/{id}")
    public ResponseEntity<Result<Issue>> getIssue(@PathVariable("id") String issueNumber){
        Result<Issue> result = new Result<>();
        Issue issue = issueRepository.findByIssueNumber(Long.parseLong(issueNumber));
        File file = new File("Capture.png");
        if(issue != null){
            try (FileOutputStream fileOutputStream = new FileOutputStream(file)){
                fileOutputStream.write(issue.getFile().getData());
                FileDescriptor fileDescriptor = fileOutputStream.getFD();

                System.out.println("stop");
            } catch(Exception e){
                System.out.println("Failed to write file");
            }

            issue.setAttachment(file);
            result.setPayload(issue);
            result.setMessage("Issue found");
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/byUser")
    public ResponseEntity<Result<List<Issue>>> retrieveBugsByUser(){
        Result<List<Issue>> result = new Result<>();
        result.setPayload(issueRepository.findAllBy("jamesandrews23"));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Autowired
    public void setIssueRepository(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    @Autowired
    public void setNextSequenceService(NextSequenceService nextSequenceService) {
        this.nextSequenceService = nextSequenceService;
    }
}
