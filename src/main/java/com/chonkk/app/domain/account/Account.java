package com.chonkk.app.domain.account;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
@Getter
@Setter
public class Account implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,length = 50)
    private String accountId;

    @Column(nullable = false,length = 50)
    private String accountPassword;

    @Column(nullable = false,length = 100)
    private String accountName;

    @Column(nullable = false,length = 50)
    private String accountTypeName;

    @CreatedDate
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Column(columnDefinition = "NULL DEFAULT CURRENT_TIMESTAMP",updatable = false)
    private LocalDateTime createAt;

    @LastModifiedDate
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Column(columnDefinition = "NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",updatable = false,insertable = false)
    private LocalDateTime updated;
}
