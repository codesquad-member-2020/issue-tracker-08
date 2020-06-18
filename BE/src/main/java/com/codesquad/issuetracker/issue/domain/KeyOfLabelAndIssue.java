package com.codesquad.issuetracker.issue.domain;

import com.codesquad.issuetracker.label.domain.LabelId;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class KeyOfLabelAndIssue {

    private IssueId issueId;

    private LabelId labelId;
}
