package com.codesquad.issuetracker;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Label {

    private String name;

    private String description;

    private String color;

    private boolean isFontColorBlack;
}
