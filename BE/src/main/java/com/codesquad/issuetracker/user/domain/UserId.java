package com.codesquad.issuetracker.user.domain;

import lombok.Getter;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
public class UserId implements Serializable {

    private Long userId;
}
