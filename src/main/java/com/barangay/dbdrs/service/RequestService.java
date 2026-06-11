package com.barangay.dbdrs.service;

import com.barangay.dbdrs.model.DocumentRequest;
import com.barangay.dbdrs.repository.RequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RequestService {

    private final RequestRepository requestRepository;

    public DocumentRequest submitRequest(DocumentRequest request) {
        request.setId(UUID.randomUUID().toString());
        request.setStatus("PENDING");
        request.setCreatedAt(
                LocalDateTime.now().format(
                        DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")
                )
        );
        return requestRepository.save(request);
    }

    public void updateRequestStatus(String id, String status) {
        requestRepository.findById(id).ifPresent(r -> {
            r.setStatus(status);
            requestRepository.save(r);
        });
    }

    public List<DocumentRequest> getAllRequests() {
        return requestRepository.findAll();
    }

    public List<DocumentRequest> getRequestsByUser(String email) {
        return requestRepository.findByUserEmail(email);
    }
}
