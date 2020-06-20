package com.codesquad.issuetracker.label.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
@ToString
public class LabelProperty {

    @Column(name = "name", unique = true)
    private String name;

    private String description;

    private String color;

    @JsonProperty("isFontColorBlack")
    private boolean isFontColorBlack;
}

