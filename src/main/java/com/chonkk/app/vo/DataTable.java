package com.chonkk.app.vo;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@Getter@Setter
@NoArgsConstructor
@SuperBuilder
public class DataTable {
    private List data;
}
