/*
package com.barangay.dbdrs.storageOldStructure;

import com.barangay.dbdrs.model.DocumentRequest;
import com.barangay.dbdrs.model.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class InMemoryStore {

    private final List<User> users = new ArrayList<>();
    private final List<DocumentRequest> requests = new ArrayList<>();

    public InMemoryStore() {
        // Constant admin for ease of use
        User admin = new User();
        admin.setId("1");
        admin.setFullName("Admin");
        admin.setEmail("dbdrs@gmail.com");
        admin.setPassword("iloveyou");
        admin.setRole("ADMIN");
        users.add(admin);
    }

    // ── USERS ──────────────────────────────
    public void addUser(User user) {
        users.add(user);
    }

    public List<User> getAllUsers() {
        return users;
    }

    public User findUserByEmail(String email) {
        return users.stream()
                .filter(u -> u.getEmail().equals(email))
                .findFirst()
                .orElse(null);
    }

    // ── REQUESTS ───────────────────────────
    public void addRequest(DocumentRequest request) {
        requests.add(request);
    }

    public List<DocumentRequest> getAllRequests() {
        return requests;
    }

    public List<DocumentRequest> getRequestsByUser(String email) {
        return requests.stream()
                .filter(r -> r.getUserEmail().equals(email))
                .toList();
    }

    public void updateRequestStatus(String requestId, String newStatus) {
        requests.stream()
                .filter(r -> r.getId().equals(requestId))
                .findFirst()
                .ifPresent(r -> r.setStatus(newStatus));
    }
}
*/