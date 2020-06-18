package com.codesquad.issuetracker.issue.domain;

import com.codesquad.issuetracker.user.domain.UserId;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class KeyOfUserAndIssue implements Serializable {

    private UserId userId;

    private IssueId issueId;
}
