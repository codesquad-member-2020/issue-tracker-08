package com.codesquad.issuetracker.issue.domain;

import lombok.Getter;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
public class IssueId implements Serializable {


    private Long issueId;
}
