package com.trackthatbug.trackthatbug.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.bson.types.Binary;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

public class Comment implements Serializable {
    private UUID id;
    private String commentMessage;
    private Date date;
    @JsonIgnore
    private Binary file;
    private String user;
    private boolean attachment;
    private String fileName;
    private byte[] fileInBytes;

    public Comment() {
        this.id = UUID.randomUUID();
    }

    public Comment(String commentMessage, Date date, Binary file, String user) {
        this.id = UUID.randomUUID();
        this.commentMessage = commentMessage;
        this.date = date;
        this.file = file;
        this.user = user;
    }

    public String getCommentMessage() {
        return commentMessage;
    }

    public void setCommentMessage(String commentMessage) {
        this.commentMessage = commentMessage;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Binary getFile() {
        return file;
    }

    public void setFile(Binary file) {
        this.file = file;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public boolean isAttachment() {
        return attachment;
    }

    public void setAttachment(boolean attachment) {
        this.attachment = attachment;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public byte[] getFileInBytes() {
        return fileInBytes;
    }

    public void setFileInBytes(byte[] fileInBytes) {
        this.fileInBytes = fileInBytes;
    }
}
