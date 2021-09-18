package com.trackthatbug.trackthatbug.validators;

import com.trackthatbug.trackthatbug.models.RegisterUserDTO;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

public class UserDTOValidator implements Validator {
    @Override
    public boolean supports(Class<?> aClass) {
        return aClass.equals(RegisterUserDTO.class);
    }

    @Override
    public void validate(Object o, Errors errors) {
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "firstName", "errors.firstName.empty", "First name is required");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "lastName", "errors.lastName.empty", "Last name is required");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "emailAddress", "errors.emailAddress.empty", "Email address is required");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password", "errors.password.empty", "Password is required");
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "username", "errors.username.empty", "Username is required");

        RegisterUserDTO userDTO = (RegisterUserDTO) o;

        if(!userDTO.getPassword().equals(userDTO.getConfirmPassword())){
            errors.rejectValue("password", "errors.password.match", "Confirm password does not match");
        }
    }
}
