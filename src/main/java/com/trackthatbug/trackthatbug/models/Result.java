package com.trackthatbug.trackthatbug.models;

public class Result {
    private boolean error;
    private String message;

    public Result(){
        this.error = false;
    }

    public boolean isError() {
        return error;
    }

    public void setError(boolean error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
