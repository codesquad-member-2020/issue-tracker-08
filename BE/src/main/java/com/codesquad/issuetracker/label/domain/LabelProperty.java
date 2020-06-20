package com.codesquad.issuetracker.label.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Embeddable
public class LabelProperty {

    private String name;

    private String description;

    private String color;

    private boolean isFontColorBlack;
}

