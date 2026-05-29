package com.barangay.dbdrs.model;

import lombok.Data;

@Data
public class User {
    private String id;
    private String fullName;
    private String email;
    private String password;
    private String role; // "USER" or "ADMIN (baka magconstant sa isa nga admin? idek)"
}