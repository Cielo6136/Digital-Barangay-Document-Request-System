package com.barangay.dbdrs.controller;

import com.barangay.dbdrs.model.User;
import com.barangay.dbdrs.storage.InMemoryStore;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final InMemoryStore store;

    // SIGNUP
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        if (store.findUserByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        user.setId(UUID.randomUUID().toString());
        user.setRole("USER");
        store.addUser(user);
        return ResponseEntity.ok("User registered successfully");
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        User user = store.findUserByEmail(email);

        if (user == null || !user.getPassword().equals(password)) {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }

        return ResponseEntity.ok(Map.of(
                "id",       user.getId(),
                "fullName", user.getFullName(),
                "email",    user.getEmail(),
                "role",     user.getRole()
        ));
    }
}