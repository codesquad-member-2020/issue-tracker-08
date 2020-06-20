package com.codesquad.issuetracker.issue.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class Filter {

    private Boolean isOpen = true;

    private String author;

    private String label;

    private String milestone;

    private String assignee;

    private SortBy sort;
}
