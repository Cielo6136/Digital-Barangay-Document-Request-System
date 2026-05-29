package com.barangay.dbdrs.model;

import lombok.Data;

@Data
public class DocumentRequest {
    private String id;
    private String userEmail;
    private String documentType;
    private String purpose;
    private String status; // "For Approval, Processing, Ready for Pickup, Completed"
    private String createdAt;
}