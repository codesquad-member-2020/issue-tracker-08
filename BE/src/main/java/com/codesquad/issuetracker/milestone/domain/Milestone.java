package com.codesquad.issuetracker.milestone.domain;

import com.codesquad.issuetracker.common.BaseTimeEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class  Milestone extends BaseTimeEntity {

    @EmbeddedId
    private MilestoneId id;

    private String title;

    private LocalDateTime dueDate;

    private String description;

    private boolean isOpen;
}
