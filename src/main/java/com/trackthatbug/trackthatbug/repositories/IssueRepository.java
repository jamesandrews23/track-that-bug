package com.trackthatbug.trackthatbug.repositories;

import com.trackthatbug.trackthatbug.models.Issue;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IssueRepository extends MongoRepository<Issue, String> {
    Issue findByIssueNumber(String issueNumber);
    Issue findByUser(String user);
    Issue findByAssignedTo(String assignedTo);
    Issue findAllBy(String user);
}
