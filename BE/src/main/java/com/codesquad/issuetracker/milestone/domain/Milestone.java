package com.codesquad.issuetracker.milestone.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class  Milestone {

    @EmbeddedId
    private MilestoneId id;

    private String title;

    private LocalDateTime dueDate;

    private String description;

    private LocalDateTime updatedAt;

    private boolean isOpen;
}