package com.chonkk.app.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.ws.Response;

import com.chonkk.app.domain.account.Account;
import com.chonkk.app.domain.account.AccountRequest;
import com.chonkk.app.domain.account.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
@Slf4j
public class AccountController {

    private final AccountService accountService;

    @GetMapping({"","/"})
    public ModelAndView schedule() {
        return new ModelAndView("account");
    }

    @PostMapping("/insert")
    public ResponseEntity<String> save(@RequestBody AccountRequest accountRequest){
        try{
            accountService.save(accountRequest);
            return  new ResponseEntity<>("Success", HttpStatus.OK);
        }catch (Exception e){
            log.error("",e);
            return new ResponseEntity<>("Error", HttpStatus.OK);
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Account> find (@PathVariable Long id){
        return new ResponseEntity<>(accountService.findAccountById(id), HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity list(HttpServletRequest request,
           @RequestParam(required = false, defaultValue = "0") int page,
           @RequestParam(required = false, defaultValue = "5") int size){
        try{
            Map<String, String[]> map =   request.getParameterMap();

            return new ResponseEntity<>(
                    accountService.findAll(PageRequest.of(page,size)),
                    HttpStatus.OK);
        }catch(Exception e){
            log.error("",e);
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody AccountRequest accountRequest){
        try{
            accountService.save(accountRequest);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Error", HttpStatus.OK);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete (@PathVariable Long id){
        try{
            accountService.delete(id);
            return new ResponseEntity<>("Success", HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>("Error", HttpStatus.OK);
        }
    }
}
