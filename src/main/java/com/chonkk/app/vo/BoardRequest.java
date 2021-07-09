package com.chonkk.app.vo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardRequest {
    private Long id;
    private String author;
    private String title;
    private String content;
}
