package com.barangay.dbdrs.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "document_requests")
public class DocumentRequest {

    @Id
    private String id;

    private String userEmail;
    private String documentType;
    private String purpose;
    private String status; // "Pending", "For Approval", "Processing", "Ready for Pickup", "Completed"
    private String createdAt;
}
