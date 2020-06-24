package com.codesquad.issuetracker.label.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
@ToString
public class LabelProperty {

    @Size(max = 50)
    @Column(name = "name", unique = true)
    private String name;

    private String description;

    private String color;

    @JsonProperty("isFontColorBlack")
    private boolean isFontColorBlack;
}

