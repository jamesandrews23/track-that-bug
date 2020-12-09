package com.trackthatbug.trackthatbug.repositories;

import com.trackthatbug.trackthatbug.models.Issue;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepository extends PagingAndSortingRepository<Issue, String> {
    Issue findByIssueNumber(long issueNumber);
    Issue findByUser(String user);
    Issue findByAssignedTo(String assignedTo);
    List<Issue> findAllBy(String user);
    @Query("{ 'issueNumber' : ?0 }")
    List<Issue> findByIssue(String issueNumber);
}
