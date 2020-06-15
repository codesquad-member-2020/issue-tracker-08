package com.codesquad.issuetracker.issue.domain;

import com.codesquad.issuetracker.label.domain.Label;
import com.codesquad.issuetracker.milestone.domain.Milestone;
import com.codesquad.issuetracker.user.domain.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Milestone milestone;

    @ManyToOne
    private User author;

    @ManyToMany
    private List<User> assignees;

    @ManyToMany
    private List<Label> labels;

    @OneToMany
    private List<Comment> comments;

    private LocalDateTime createdAt;

    private String title;

    private String content;

    private boolean isOpen;
}
