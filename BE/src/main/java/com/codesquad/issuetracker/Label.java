package com.codesquad.issuetracker;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
@Setter
public class Label {

    private String name;

    private String description;

    private String color;

    @JsonProperty("isFontColorBlack")
    private boolean isFontColorBlack;
}
