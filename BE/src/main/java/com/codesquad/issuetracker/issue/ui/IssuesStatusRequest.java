package com.codesquad.issuetracker.issue.ui;

import com.codesquad.issuetracker.issue.domain.IssueId;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class IssuesStatusRequest {

    private List<IssueId> issues;

    private Boolean isOpen;
}
