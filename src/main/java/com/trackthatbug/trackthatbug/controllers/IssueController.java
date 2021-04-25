package com.trackthatbug.trackthatbug.controllers;

import com.trackthatbug.trackthatbug.models.AttachmentRequest;
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
import java.util.UUID;

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
                issueResult.setMessage("Bug " + issue.getIssueNumber() + " created");
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

    @PostMapping(value = "/getAttachment")
    public ResponseEntity<Resource> downloadAttachment(@RequestBody AttachmentRequest request) {
        Issue issue = issueRepository.findByIssueNumber(Long.parseLong(request.getIssueNumber()));
        UUID commentId = UUID.fromString(request.getId());

        HttpHeaders headers = new HttpHeaders();

        ByteArrayResource resource = null;
        for(Comment comment : issue.getComments()){
            if(comment.getId().equals(commentId)){
                resource = new ByteArrayResource(comment.getFile().getData());
                headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + comment.getFileName());
            }
        }

        if(resource != null){
            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(resource.contentLength())
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/byUser")
    public ResponseEntity<Result<List<Issue>>> retrieveBugsByUser(Principal principal){
        Result<List<Issue>> result = new Result<>();
        result.setPayload(issueRepository.findAllBy(principal.getName()));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    public void addComment(Issue issue, MultipartFile[] files, String user) throws IOException {
        String commentMessage = issue.getComment();
        Comment comment = new Comment();

        if(commentMessage != null && !"".equals(commentMessage)){
            comment.setCommentMessage(commentMessage);
        }

        if(files != null && files.length > 0){
            comment.setFileInBytes(files[0].getBytes());
            comment.setFile(new Binary(BsonBinarySubType.BINARY, files[0].getBytes()));
            comment.setFileName(files[0].getOriginalFilename());
            comment.setAttachment(true);
        }

        comment.setUser(user);
        comment.setDate(new Date());
        issue.setComment("");
        issue.getComments().add(comment);
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
