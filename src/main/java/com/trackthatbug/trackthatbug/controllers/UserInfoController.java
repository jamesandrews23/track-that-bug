package com.trackthatbug.trackthatbug.controllers;

import com.trackthatbug.trackthatbug.models.User;
import com.trackthatbug.trackthatbug.models.UserInfo;
import com.trackthatbug.trackthatbug.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class UserInfoController {
    private UserRepository repository;

    @GetMapping("/getUserInfo")
    public ResponseEntity<UserInfo> getUserInfo(Principal principal){
        UserInfo userInfo = new UserInfo();
        String userName = principal.getName();
        User user = repository.findByUsername(userName);
        if(user != null){
            userInfo.setUserName(user.getUsername());
        }
        return new ResponseEntity<>(userInfo, HttpStatus.OK);
    }

    @Autowired
    public void setRepository(UserRepository repository) {
        this.repository = repository;
    }
}
