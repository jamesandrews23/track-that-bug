package com.trackthatbug.trackthatbug.models;

public class Result<T> {
    private boolean error;
    private String message;
    private T payload;

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

    public T getPayload() {
        return payload;
    }

    public void setPayload(T payload) {
        this.payload = payload;
    }
}
