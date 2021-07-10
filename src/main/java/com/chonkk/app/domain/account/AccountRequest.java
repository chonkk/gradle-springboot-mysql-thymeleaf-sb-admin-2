package com.chonkk.app.domain.account;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@Setter
public class AccountRequest {

    private Long id;

    private String accountId;

    private String accountPassword;

    private String accountName;

    private String accountTypeName;

//    private LocalDateTime createAt;
}
