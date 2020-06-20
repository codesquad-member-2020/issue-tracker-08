package com.codesquad.issuetracker.label.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Label {

    @EmbeddedId
    private LabelId id;

    @Embedded
    private LabelProperty labelProperty;
}
