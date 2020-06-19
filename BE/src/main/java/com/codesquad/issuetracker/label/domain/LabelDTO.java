package com.codesquad.issuetracker.label.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LabelDTO {

    private String name;

    private String description;

    private String color;

    private boolean isFontColorBlack;
}

