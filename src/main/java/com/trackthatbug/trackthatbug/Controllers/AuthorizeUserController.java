package com.trackthatbug.trackthatbug.Controllers;

import com.trackthatbug.trackthatbug.models.User;
import com.trackthatbug.trackthatbug.repositories.UserRepository;
import com.trackthatbug.trackthatbug.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AuthorizeUserController {
    private UserDetailsServiceImpl userDetailsService;
    private UserRepository userRepository;

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

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
