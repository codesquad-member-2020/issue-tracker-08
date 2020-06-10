package com.codesquad.issuetracker;

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
public class Milestone {

    private Long id;

    private String title;

    private String description;

    private String dueDate;

    private String updatedAt;

    @JsonProperty("isOpen")
    private boolean isOpen;

    private List<Issue> issues;

    private int achievementRate;

    private int numberOfOpenIssue;

    private int numberOfClosedIssue;
}
