package com.trackthatbug.trackthatbug;

import com.trackthatbug.trackthatbug.db.User;
import com.trackthatbug.trackthatbug.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TrackthatbugApplication implements CommandLineRunner {
    @Autowired
    private MongoConnection connection;

    @Autowired
    private UserRepository userRepository;

	public static void main(String[] args) {
        SpringApplication.run(TrackthatbugApplication.class, args);
	}

    @Override
    public void run(String... args) throws Exception {
        User found = userRepository.findByFirstName("James");
        System.out.println(found);
    }

}
