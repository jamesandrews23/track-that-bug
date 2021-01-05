package com.trackthatbug.trackthatbug.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.bson.types.Binary;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.File;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Document(collection = "issues")
public class Issue {
    @Id private String id;
    @Indexed(unique = true, direction = IndexDirection.DESCENDING)
    private long issueNumber;
    private String user;
    private String assignedTo;
//    private ZonedDateTime createdOn; //todo need a mongodb converter to use ZonedDateTime, use Date for now
    private String createdBy;
    private String description;
    private String title;
    private Status status;
    @CreatedDate
    private Date createdOn;
    //todo @LastModifiedDate add a field for the last modified date

    private String fileName;
    @JsonIgnore
    private Binary attachment;
    private String lastModifiedBy;
    private Date lastModifiedDate;
    private String pathToAttachment;

    public Issue() {
        this.status = Status.OPEN;
        this.assignedTo = "";
        this.description = "";
        this.title = "";
        this.lastModifiedBy = "";
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public long getIssueNumber() {
        return issueNumber;
    }

    public void setIssueNumber(long issueNumber) {
        this.issueNumber = issueNumber;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(String assignedTo) {
        this.assignedTo = assignedTo;
    }

//    public ZonedDateTime getCreatedOn() {
//        return createdOn;
//    }
//
//    public void setCreatedOn(ZonedDateTime createdOn) {
//        this.createdOn = createdOn;
//    }


    public Date getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Date createdOn) {
        this.createdOn = createdOn;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Binary getAttachment() {
        return attachment;
    }

    public void setAttachment(Binary attachment) {
        this.attachment = attachment;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public Date getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Date lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    public String getPathToAttachment() {
        return pathToAttachment;
    }

    public void setPathToAttachment(String pathToAttachment) {
        this.pathToAttachment = pathToAttachment;
    }
}
