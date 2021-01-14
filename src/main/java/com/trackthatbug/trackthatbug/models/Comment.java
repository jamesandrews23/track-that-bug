package com.trackthatbug.trackthatbug.models;

import java.io.Serializable;
import java.util.Date;

public class Comment implements Serializable {
    private String commentMessage;
    private Date date;
    private String attachment;

    public Comment() {
    }

    public Comment(String commentMessage, Date date, String attachment) {
        this.commentMessage = commentMessage;
        this.date = date;
        this.attachment = attachment;
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

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }
}
