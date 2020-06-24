package com.codesquad.issuetracker.issue.domain;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class IssueId implements Serializable {

    @Column(name = "issue_id")
    private Long issueId;
}
