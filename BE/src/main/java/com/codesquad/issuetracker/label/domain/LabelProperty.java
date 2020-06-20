package com.codesquad.issuetracker.label.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class LabelProperty {

    private String name;

    private String description;

    private String color;

    private boolean isFontColorBlack;
}

