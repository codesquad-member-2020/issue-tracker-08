package com.codesquad.issuetracker;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Builder
public class Issue {

    private Long id;

    private User author;

    private List<User> assignees;

    @JsonIgnoreProperties({"description"})
    private List<Label> labels;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<Comment> comments;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Milestone milestone;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    private String title;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String content;

    private int numberOfComment;

    @JsonProperty("isOpen")
    private boolean isOpen;
}
