package com.codesquad.issuetracker.label.domain;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class LabelId implements Serializable {

    @Column(name = "label_id")
    private Long labelId;
}
