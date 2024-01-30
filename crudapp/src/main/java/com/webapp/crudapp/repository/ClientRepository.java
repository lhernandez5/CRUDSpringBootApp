package com.webapp.crudapp.repository;

import com.webapp.crudapp.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {

}
