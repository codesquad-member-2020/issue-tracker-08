package com.codesquad.issuetracker.issue.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class Filter {

    private static final int PAGE_SIZE = 5;

    private Boolean isOpen = true;

    private Long author;

    private Long label;

    private Long milestone;

    private Long assignee;

    private SortBy sort;

    private int page;

    public void setPage(int page) {
        this.page = page <= 0 ? 0 : page - 1;
    }

    public PageRequest getPageRequest() {
        return PageRequest.of(page, PAGE_SIZE, Sort.by("id").descending());
    }
}
