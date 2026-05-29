package com.barangay.dbdrs.service;

import com.barangay.dbdrs.model.User;
import com.barangay.dbdrs.storage.InMemoryStore;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final InMemoryStore store;

    public String signup(User user) {
        // check if email already exists
        if (store.findUserByEmail(user.getEmail()) != null) {
            return null; // email taken
        }

        user.setId(UUID.randomUUID().toString());
        user.setRole("USER");
        store.addUser(user);
        return "User registered successfully";
    }

    public User login(String email, String password) {
        User user = store.findUserByEmail(email);

        if (user == null || !user.getPassword().equals(password)) {
            return null; // invalid credentials
        }

        return user;
    }
}