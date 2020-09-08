package com.trackthatbug.trackthatbug.Controllers;

import com.trackthatbug.trackthatbug.models.User;
import com.trackthatbug.trackthatbug.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

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

    @RequestMapping("/loginError")
    public String loginError(Model model){
        model.addAttribute("loginError", true);
        return "login.html";
    }

    public UserDetailsServiceImpl getUserDetailsService() {
        return userDetailsService;
    }

    @Autowired
    public void setUserDetailsService(UserDetailsServiceImpl userDetailsService) {
        this.userDetailsService = userDetailsService;
    }
}
