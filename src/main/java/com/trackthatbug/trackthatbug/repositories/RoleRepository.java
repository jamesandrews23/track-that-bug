package com.trackthatbug.trackthatbug.repositories;

import com.trackthatbug.trackthatbug.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoleRepository extends MongoRepository<Role, String> {
    Role findByRole(String role);
}
