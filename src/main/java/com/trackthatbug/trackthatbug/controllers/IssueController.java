package com.trackthatbug.trackthatbug.controllers;

import com.trackthatbug.trackthatbug.models.Comment;
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

import javax.validation.Valid;
import java.io.*;
import java.nio.file.*;
import java.security.Principal;
import java.util.Date;
import java.util.List;

@RestController
public class IssueController {
    private IssueRepository issueRepository;
    private NextSequenceService nextSequenceService;
    private static final String BUILD_DIR = "\\build\\resources\\main\\public\\";

    @PatchMapping(value = "/saveIssue", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Result<Issue>> createIssue(
                @RequestPart("properties") @Valid Issue issue,
                @RequestPart("files") MultipartFile[] files,
                BindingResult bindingResult, Principal principal){
        Result<Issue> issueResult = new Result<>();
        String user = principal.getName();

        if(issue.getIssueNumber() > 0){
            //not a new issue, modify it
            issue.setLastModifiedBy(user);
            issue.setLastModifiedDate(new Date());
            addAFile(issue, files, issueResult);
            issueResult.setMessage("Bug " + issue.getIssueNumber() + " modified");
            if(issue.getComment() != null && !"".equals(issue.getComment())){
                issue.getComments().add(new Comment(issue.getComment(), new Date(), issue.getFileName()));
                issue.setComment("");
            }
        } else {
            issue.setUser(user);
            issue.setCreatedBy(user);
            issue.setCreatedOn(new Date());
            issue.setIssueNumber(nextSequenceService.getNextSequence("CustomSequence"));

            if(issue.getComment() != null && !"".equals(issue.getComment())){
                issue.getComments().add(new Comment(issue.getComment(), new Date(), issue.getFileName()));
                issue.setComment("");
            }

            addAFile(issue, files, issueResult);

            issueResult.setMessage("But " + issue.getIssueNumber() + " created");
        }

        issueRepository.save(issue);

        issueResult.setPayload(issue);
        return new ResponseEntity<>(issueResult, HttpStatus.OK);
    }

    @GetMapping(value = "/getIssue/{id}")
    public ResponseEntity<Result<Issue>> getIssue(@PathVariable("id") String issueNumber){
        Result<Issue> result = new Result<>();
        Issue issue = issueRepository.findByIssueNumber(Long.parseLong(issueNumber));


        if(issue != null){
            try {
                if(issue.getFileName() != null && issue.getAttachment() != null){
                    Files.write(Paths.get(System.getProperty("user.dir") + BUILD_DIR + issue.getFileName()), issue.getAttachment().getData());
                    issue.setPathToAttachment(issue.getFileName());
                }
            } catch (IOException io){
                io.printStackTrace();
            }

            result.setPayload(issue);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/byUser")
    public ResponseEntity<Result<List<Issue>>> retrieveBugsByUser(Principal principal){
        Result<List<Issue>> result = new Result<>();
        result.setPayload(issueRepository.findAllBy(principal.getName()));
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    public void addAFile(Issue issue, MultipartFile[] files, Result<Issue> issueResult) {
        if(files.length > 0){
            try {
                addFilesToIssue(issue, files);
            } catch(IOException e){
                issueResult.setPayload(issue);
                //todo set an error here for adding file
            }
        }
    }

    public void addFilesToIssue(Issue issue, MultipartFile[] files) throws IOException {
        issue.setFileName(files[0].getOriginalFilename());
        issue.setAttachment(new Binary(BsonBinarySubType.BINARY, files[0].getBytes()));
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
