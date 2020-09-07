package com.trackthatbug.trackthatbug.Controllers;

import com.trackthatbug.trackthatbug.models.User;
import com.trackthatbug.trackthatbug.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class AuthorizeUserController {
    private UserDetailsServiceImpl userDetailsService;

//    @PostMapping("/login")
//    public String login(User user){
//        //look for user
//        //return dashboard
//        this.userDetailsService.loadUserByUsername(user.getUsername());
//        return "dashboard.html";
//    }

    @PostMapping("/registerUser")
    public String registerUser(User user){
        //register new user then return to login if successful`
        return "register.html";
    }

    public UserDetailsServiceImpl getUserDetailsService() {
        return userDetailsService;
    }

    @Autowired
    public void setUserDetailsService(UserDetailsServiceImpl userDetailsService) {
        this.userDetailsService = userDetailsService;
    }
}
