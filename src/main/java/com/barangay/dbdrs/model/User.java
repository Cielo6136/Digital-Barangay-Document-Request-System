package com.barangay.dbdrs.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    private String id;

    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;
    private String role; // "USER" or "ADMIN"
}
