package com.barangay.dbdrs.controller;

import com.barangay.dbdrs.model.DocumentRequest;
import com.barangay.dbdrs.service.RequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    @PostMapping
    public ResponseEntity<DocumentRequest> submitRequest(
            @RequestBody DocumentRequest request) {
        DocumentRequest created = requestService.submitRequest(request);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        requestService.updateRequestStatus(id, body.get("status"));
        return ResponseEntity.ok("Status updated");
    }

    @GetMapping
    public ResponseEntity<List<DocumentRequest>> getAllRequests() {
        return ResponseEntity.ok(requestService.getAllRequests());
    }

    @GetMapping("/{email}")
    public ResponseEntity<List<DocumentRequest>> getRequestsByUser(
            @PathVariable String email) {
        return ResponseEntity.ok(requestService.getRequestsByUser(email));
    }
}