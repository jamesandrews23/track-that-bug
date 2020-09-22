package com.trackthatbug.trackthatbug.controllers;

import com.trackthatbug.trackthatbug.models.User;
import com.trackthatbug.trackthatbug.repositories.UserRepository;
import com.trackthatbug.trackthatbug.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.print.attribute.standard.Media;
import javax.validation.Valid;

@RestController
public class RegisterUserController {
    private UserDetailsServiceImpl userDetailsService;
    private UserRepository userRepository;


    @CrossOrigin(origins = "http://localhost:8080")
    @PostMapping(value = "/registerUser", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> registerUser(@RequestBody @Valid User user, BindingResult result){
        if(result.hasErrors()){
            return new ResponseEntity<>("error", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("test", HttpStatus.OK);
    }

    @PostMapping("/addUser")
    public String addUser(@ModelAttribute User user, Model model){
        //register new user then return to login if successful`
        User available = userRepository.findByUsername(user.getUsername());
        if(available == null){
            //add user
            try {
                userDetailsService.saveUser(user);
                model.addAttribute("userCreated", true);
            } catch(Exception e){
                model.addAttribute("userError", true);
            }

        } else {
            //show error
            model.addAttribute("userError", true);
        }

        return "registerUser.html";
    }

    public UserDetailsServiceImpl getUserDetailsService() {
        return userDetailsService;
    }

    @Autowired
    public void setUserDetailsService(UserDetailsServiceImpl userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
