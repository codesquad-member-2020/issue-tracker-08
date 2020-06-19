package com.codesquad.issuetracker.milestone.domain;

import com.codesquad.issuetracker.issue.domain.IssueDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class MilestoneDTO {

    private Long id;

    private String title;

    private String description;

    private LocalDate dueDate;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;

    @JsonProperty
    private Boolean isOpen;

    private long achievementRate;

    private long numberOfOpenIssue;

    private long numberOfClosedIssue;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<IssueDTO> issues;
}
