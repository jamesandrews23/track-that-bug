package com.trackthatbug.trackthatbug.models;

import org.bson.types.Binary;

import java.io.Serializable;
import java.util.Date;

public class Comment implements Serializable {
    private long id;
    private String commentMessage;
    private Date date;
    private Binary attachment;
    private String user;

    public Comment() {
    }

    public Comment(String commentMessage, Date date, Binary attachment, String user) {
        this.commentMessage = commentMessage;
        this.date = date;
        this.attachment = attachment;
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

    public Binary getAttachment() {
        return attachment;
    }

    public void setAttachment(Binary attachment) {
        this.attachment = attachment;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }
}
