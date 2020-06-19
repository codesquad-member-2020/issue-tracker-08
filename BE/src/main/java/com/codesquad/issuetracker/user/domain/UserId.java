package com.codesquad.issuetracker.user.domain;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class UserId implements Serializable {

    @Column(name = "user_id")
    private Long userId;
}
