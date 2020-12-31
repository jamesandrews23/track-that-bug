package com.trackthatbug.trackthatbug.models;

import java.io.Serializable;

public class RegisterUserResponse implements Serializable {
    private String confirmationMessage;

    public RegisterUserResponse() {
        this.confirmationMessage = "";
    }

    public String getConfirmationMessage() {
        return confirmationMessage;
    }

    public void setConfirmationMessage(String confirmationMessage) {
        this.confirmationMessage = confirmationMessage;
    }
}
