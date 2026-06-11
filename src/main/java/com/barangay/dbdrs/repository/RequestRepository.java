package com.barangay.dbdrs.repository;

import com.barangay.dbdrs.model.DocumentRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends JpaRepository<DocumentRequest, String> {
    List<DocumentRequest> findByUserEmail(String userEmail);
}
