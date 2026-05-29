package com.barangay.dbdrs.service;

import com.barangay.dbdrs.model.DocumentRequest;
import com.barangay.dbdrs.storage.InMemoryStore;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RequestService {

    private final InMemoryStore store;

    public DocumentRequest submitRequest(DocumentRequest request) {
        request.setId(UUID.randomUUID().toString());
        request.setStatus("PENDING");
        request.setCreatedAt(
                LocalDateTime.now().format(
                        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")
                )
        );
        store.addRequest(request);
        return request;
    }

    public void updateRequestStatus(String id, String status) {
        store.updateRequestStatus(id, status);
    }

    public List<DocumentRequest> getAllRequests() {
        return store.getAllRequests();
    }

    public List<DocumentRequest> getRequestsByUser(String email) {
        return store.getRequestsByUser(email);
    }
}