package com.codesquad.issuetracker.milestone.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Milestone {

    @Id
    private Long id;

    private String title;

    private LocalDateTime dueDate;

    private String description;

    private LocalDateTime updatedAt;

    private boolean isOpen;
}
