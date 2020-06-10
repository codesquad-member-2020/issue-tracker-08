package com.codesquad.issuetracker;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class Issue {

    private Long id;

    private String author;

    private List<Assignee> assignees;

    @JsonIgnoreProperties({"description"})
    private List<Label> labels;

    private String createdAt;

    private String title;

    private int commentSize;

    @JsonProperty("isOpen")
    private boolean isOpen;
}
