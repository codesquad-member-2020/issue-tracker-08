package com.codesquad.issuetracker.label.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Label {

    @EmbeddedId
    private LabelId id;

    @Column(name = "name", unique = true)
    private String name;

    private String description;

    private String color;

    private boolean isFontColorBlack;
}
