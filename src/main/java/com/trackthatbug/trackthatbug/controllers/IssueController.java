package com.trackthatbug.trackthatbug.controllers;

import com.trackthatbug.trackthatbug.models.Comment;
import com.trackthatbug.trackthatbug.models.Issue;
import com.trackthatbug.trackthatbug.models.Result;
import com.trackthatbug.trackthatbug.repositories.IssueRepository;
import com.trackthatbug.trackthatbug.services.NextSequenceService;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import javax.validation.Valid;
import java.io.*;
import java.security.Principal;
import java.util.Date;
import java.util.List;

@RestController
public class IssueController {
    private IssueRepository issueRepository;
    private NextSequenceService nextSequenceService;

    @PatchMapping(value = "/saveIssue", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Result<Issue>> createIssue(
                @RequestPart("properties") @Valid Issue issue,
                @RequestPart("files") MultipartFile[] files,
                BindingResult bindingResult,
                Principal principal) {
        Result<Issue> issueResult = new Result<>();
        String user = principal.getName();

        try {
            if(issue.getIssueNumber() > 0){
                //not a new issue, modify it
                issue.setLastModifiedBy(user);
                issue.setLastModifiedDate(new Date());
                issueResult.setMessage("Bug " + issue.getIssueNumber() + " modified");
                addComment(issue, files, user);
            } else {
                issue.setUser(user);
                issue.setCreatedBy(user);
                issue.setCreatedOn(new Date());
                issue.setIssueNumber(nextSequenceService.getNextSequence("CustomSequence"));
                addComment(issue, files, user);
                issueResult.setMessage("But " + issue.getIssueNumber() + " created");
            }

            issueRepository.save(issue);
            issueResult.setPayload(issue);

            return new ResponseEntity<>(issueResult, HttpStatus.OK);
        } catch(IOException e){
            e.printStackTrace();
            return new ResponseEntity<>(issueResult, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/getIssue/{id}")
    public ResponseEntity<Result<Issue>> getIssue(@PathVariable("id") String issueNumber){
        Result<Issue> result = new Result<>();
        Issue issue = issueRepository.findByIssueNumber(Long.parseLong(issueNumber));


        if(issue != null){
            result.setPayload(issue);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/getAttachment/{issueNum}")
    public ResponseEntity<Resource> downloadAttachment(@PathVariable String issueNum) {
        Issue issue = issueRepository.findByIssueNumber(Long.parseLong(issueNum));

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + issue.getFileName());
        ByteArrayResource resource = new ByteArrayResource(issue.getComments().get(0).getAttachment().getData());
        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(resource.contentLength())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }


    @GetMapping("/byUser")
    public ResponseEntity<Result<List<Issue>>> retrieveBugsByUser(Principal principal){
        Result<List<Issue>> result = new Result<>();
        result.setPayload(issueRepository.findAllBy(principal.getName()));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    public void addComment(Issue issue, MultipartFile[] files, String user) throws IOException {
        String commentMessage = issue.getComment();

        if(commentMessage != null && !"".equals(commentMessage) || files.length > 0){
            issue.getComments().add(new Comment(issue.getComment(), new Date(), new Binary(
                    BsonBinarySubType.BINARY, files[0].getBytes()), issue.getUser()));
        }
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
