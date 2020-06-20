package com.codesquad.issuetracker.label.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.Embeddable;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class LabelProperty {

    private String name;

    private String description;

    private String color;

    @JsonProperty("isFontColorBlack")
    private boolean isFontColorBlack;
}

