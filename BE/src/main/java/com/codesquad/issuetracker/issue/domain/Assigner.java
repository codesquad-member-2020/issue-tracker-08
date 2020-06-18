package com.codesquad.issuetracker.issue.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
public class Assigner {

    @EmbeddedId
    private KeyOfUserAndIssue assignerId;
}
