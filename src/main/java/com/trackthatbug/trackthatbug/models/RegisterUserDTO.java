package com.trackthatbug.trackthatbug.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Email;
import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RegisterUserDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private String firstName;
    private String lastName;
    @Email(message = "Email address is invalid")
    private String emailAddress;
    private String username;
    private String password;
    private String confirmPassword;
    private MultipartFile[] userProfileImage;

    public RegisterUserDTO() {
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public MultipartFile[] getUserProfileImage() {
        return userProfileImage;
    }

    public void setUserProfileImage(MultipartFile[] userProfileImage) {
        this.userProfileImage = userProfileImage;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}
