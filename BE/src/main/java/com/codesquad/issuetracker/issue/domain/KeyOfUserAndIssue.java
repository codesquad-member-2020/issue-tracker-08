package com.codesquad.issuetracker.issue.domain;

import com.codesquad.issuetracker.user.domain.UserId;

import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import java.io.Serializable;

@Embeddable
public class KeyOfUserAndIssue implements Serializable {

    @EmbeddedId
    private UserId userId;

    @EmbeddedId
    private IssueId issueId;
}
