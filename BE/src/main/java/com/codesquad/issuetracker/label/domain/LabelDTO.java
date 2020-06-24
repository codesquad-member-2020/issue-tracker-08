package com.codesquad.issuetracker.label.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LabelDTO {

    private Long id;

    private String name;

    private String color;

    private Boolean isFontColorBlack;
}
