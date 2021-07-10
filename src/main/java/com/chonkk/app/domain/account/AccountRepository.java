package com.chonkk.app.domain.account;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account,Long> {
    public Account findAccountById(Long id);
}
