package com.trackthatbug.trackthatbug.models;

import java.io.Serializable;

public class AttachmentRequest implements Serializable {
    private static final long serialVersionUID = 1L;

    private String fileName;
    private String id;
    private String issueNumber;

    public AttachmentRequest() {
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIssueNumber() {
        return issueNumber;
    }

    public void setIssueNumber(String issueNumber) {
        this.issueNumber = issueNumber;
    }
}
