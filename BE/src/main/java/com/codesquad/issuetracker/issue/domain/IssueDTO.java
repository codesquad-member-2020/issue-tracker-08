package com.codesquad.issuetracker.issue.domain;

import com.codesquad.issuetracker.comment.domain.Comment;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class IssueDTO {

    private Long id;

    private String title;

    private String content;

    private boolean isOpen;

    private LocalDateTime createdAt;

    private List<Long> assignees;

    private List<Long> labels;

    private List<Comment> comments;

    private int sizeOfComment;

    private Long milestoneId;
}
