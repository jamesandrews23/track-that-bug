package com.trackthatbug.trackthatbug.controllers;

import com.trackthatbug.trackthatbug.models.Issue;
import com.trackthatbug.trackthatbug.models.Result;
import com.trackthatbug.trackthatbug.repositories.IssueRepository;
import com.trackthatbug.trackthatbug.services.NextSequenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.security.Principal;
import java.time.ZonedDateTime;
import java.util.Date;

@RestController
public class IssueController {
    private IssueRepository issueRepository;
    private NextSequenceService nextSequenceService;

    @CrossOrigin(origins = "http://localhost:8080")
    @PostMapping(value = "/createIssue", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Result> createIssue(@RequestBody @Valid Issue issue, BindingResult result, Principal principal){
        String user = principal.getName();
        issue.setUser(user);
        issue.setCreatedBy(user);
        issue.setCreatedOn(new Date());
        issue.setIssueNumber(nextSequenceService.getNextSequence("CustomSequence"));
        issueRepository.save(issue);
        return new ResponseEntity<>(new Result(), HttpStatus.OK);
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
