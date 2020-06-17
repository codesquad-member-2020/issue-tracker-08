package com.codesquad.issuetracker;

import com.fasterxml.jackson.annotation.JsonFormat;
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
public class Milestone {

    private Long id;

    private String title;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String description;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private LocalDateTime dueDate;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private LocalDateTime updatedAt;

    @JsonProperty("isOpen")
    private boolean isOpen;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<Issue> issues;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer achievementRate;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer numberOfOpenIssue;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer numberOfClosedIssue;
}
