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

    private Long author;

    private Long label;

    private Long milestone;

    private Long assignee;

    private SortBy sort;
}
