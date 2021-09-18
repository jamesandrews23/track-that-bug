package com.trackthatbug.trackthatbug.models;

import org.springframework.validation.ObjectError;

import java.util.Collections;
import java.util.List;

public class Result<T> {
    private boolean error = false;
    private String message;
    private T payload;
    private List<ObjectError> errors = Collections.emptyList();

    public Result(){

    }

    public Result(T payload) {
        this.payload = payload;
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

    public List<ObjectError> getErrors() {
        return errors;
    }

    public void setErrors(List<ObjectError> errors) {
        this.errors = errors;
    }
}
