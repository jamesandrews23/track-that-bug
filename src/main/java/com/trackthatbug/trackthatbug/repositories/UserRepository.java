package com.trackthatbug.trackthatbug.repositories;

import com.trackthatbug.trackthatbug.db.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findByFirstName(String firstName);
}
