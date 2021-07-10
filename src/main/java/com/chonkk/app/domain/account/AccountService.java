package com.chonkk.app.domain.account;

import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@NoArgsConstructor
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public Page<Account> findAll(Pageable pageable){
        return accountRepository.findAll(pageable);
    }

    public Long save(AccountRequest accountRequest){
        Account account = new Account();
        BeanUtils.copyProperties(accountRequest, account);
        account = accountRepository.save(account);
        return account.getId();
    }

    public Account findAccountById(Long id) {
       return accountRepository.findAccountById(id);
    }

    public void delete(Long id) {
        accountRepository.deleteById(id);
    }
}
