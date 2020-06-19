package com.codesquad.issuetracker.milestone.domain;

import com.codesquad.issuetracker.common.BaseTimeEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class  Milestone extends BaseTimeEntity {

    @EmbeddedId
    private MilestoneId id;

    @Column(name = "title", unique = true)
    private String title;

    private LocalDate dueDate;

    private String description;

    private boolean isOpen = true;
}
