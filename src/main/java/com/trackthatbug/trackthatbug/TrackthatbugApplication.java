package com.trackthatbug.trackthatbug;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TrackthatbugApplication implements CommandLineRunner {
    @Autowired
    private MongoConnection connection;

	public static void main(String[] args) {
        SpringApplication.run(TrackthatbugApplication.class, args);
	}

    @Override
    public void run(String... args) throws Exception {
//        connection.example();

    }

}
