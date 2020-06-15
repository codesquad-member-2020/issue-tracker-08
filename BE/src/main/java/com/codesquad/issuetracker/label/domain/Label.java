package com.codesquad.issuetracker.label.domain;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Label {

    @Id
    private Long id;

    private String name;

    private String description;

    private String color;

    private boolean isFontColorBlack;
}
