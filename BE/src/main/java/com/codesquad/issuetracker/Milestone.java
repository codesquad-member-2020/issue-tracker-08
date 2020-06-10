package com.codesquad.issuetracker;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class Milestone {

    private Long id;

    private String title;

    private String description;

    private String dueDate;

    private String updatedAt;

    @JsonProperty("isOpen")
    private boolean isOpen;
}
