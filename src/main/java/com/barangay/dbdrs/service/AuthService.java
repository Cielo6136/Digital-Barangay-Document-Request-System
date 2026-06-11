package com.barangay.dbdrs.service;

import com.barangay.dbdrs.model.User;
import com.barangay.dbdrs.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService implements ApplicationRunner {

    private final UserRepository userRepository;

    //For Seeding the default admin account on every startup if not present
    @Override
    public void run(ApplicationArguments args) {
        if (userRepository.findByEmail("dbdrs@gmail.com").isEmpty()) {
            User admin = new User();
            admin.setId(UUID.randomUUID().toString());
            admin.setFullName("Admin");
            admin.setEmail("dbdrs@gmail.com");
            admin.setPassword("iloveyou");
            admin.setRole("ADMIN");
            userRepository.save(admin);
        }
    }

    public String signup(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return null; //If email already exists
        }
        user.setId(UUID.randomUUID().toString());
        user.setRole("USER");
        userRepository.save(user);
        return "User registered successfully";
    }

    public User login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(u -> u.getPassword().equals(password))
                .orElse(null);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
