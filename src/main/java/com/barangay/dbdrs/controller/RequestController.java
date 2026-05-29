package com.barangay.dbdrs.controller;

import com.barangay.dbdrs.model.DocumentRequest;
import com.barangay.dbdrs.service.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    // USER — submit a new request
    @PostMapping
    public ResponseEntity<DocumentRequest> submitRequest(
            @RequestBody DocumentRequest request) {
        DocumentRequest created = requestService.submitRequest(request);
        return ResponseEntity.ok(created);
    }

    // ADMIN — get all requests
    @GetMapping
    public ResponseEntity<List<DocumentRequest>> getAllRequests() {
        return ResponseEntity.ok(requestService.getAllRequests());
    }

    // USER — get own requests by email
    @GetMapping("/{email}")
    public ResponseEntity<List<DocumentRequest>> getRequestsByUser(
            @PathVariable String email) {
        return ResponseEntity.ok(requestService.getRequestsByUser(email));
    }
}