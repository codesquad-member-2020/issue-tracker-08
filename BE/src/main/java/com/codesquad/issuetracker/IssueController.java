package com.codesquad.issuetracker;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
public class IssueController {

    @GetMapping("/issues")
    public Object issueList() {
        List<Assignee> assignees = new ArrayList<>();
        assignees.add(new Assignee("Jay", "jay.png"));
        assignees.add(new Assignee("Ever", "ever.jpeg"));

        List<Label> labels = new ArrayList<>();
        labels.add(new Label("BE", "BE 이슈", "#0366d6"));
        labels.add(new Label("FE", "FE 이슈", "#72c2c9"));

        Issue issueBE = new Issue(1L, "Jay", assignees, labels, LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")), "[BE] GitHub OAuth", 1, true);

        assignees.clear();
        assignees.add(new Assignee("Hoo", "Hoo.png"));
        assignees.add(new Assignee("Sally", "sally.jpeg"));

        labels.clear();
        labels.add(new Label("BE 리뷰 요청","BE 리뷰 요청 용 라벨", "#d4c5f9"));
        labels.add(new Label("Feature", "기능 구현", "#f7b4b6"));

        Issue issueFE = new Issue(2L, "Hoo", assignees, labels, "2020-06-07 17:59:32", "[FE] 컨벤션 논의", 3, true);

        List<Issue> issues = new ArrayList<>();
        issues.add(issueBE);
        issues.add(issueFE);

        return new IssueBoard(2, 3, issues);
    }

    @GetMapping("/labels")
    public Object labelList() {
        List<Label> labels = new ArrayList<>();
        labels.add(new Label("BE", "BE 이슈", "#0366d6"));
        labels.add(new Label("FE", "FE 이슈", "#72c2c9"));
        labels.add(new Label("BE 리뷰 요청","BE 리뷰 요청 용 라벨", "#d4c5f9"));
        labels.add(new Label("Feature", "기능 구현", "#f7b4b6"));
        return labels;
    }

    @GetMapping("/milestones")
    public Object milestoneList() {
        List<Milestone> milestones = new ArrayList<>();
        milestones.add(new Milestone(1L, "FE 1주차", "FE 1주차 마일스톤", "2020-06-15 00:00:00", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")), true, 68, 8, 17));
        milestones.add(new Milestone(2L, "BE 1주차", "BE 1주차 계획", "2020-06-13 00:00:00", LocalDateTime.now().minusDays(1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")), true, 100, 0, 1));

        return new MilestoneBoard(2, 1, milestones);
    }

    @GetMapping("/milestones/{milestone_id}/issues")
    public Object issueListOfMilestone(@PathVariable(value = "milestone_id") Long milestoneId) {

        return null;
    }

    @GetMapping("/users")
    public Object userList() {
        List<User> users = new ArrayList<>();
        users.add(new User(1L, "Ever", "asdqwe1!", "ever@gmail.com"));
        users.add(new User(2L, "Jay", "jay1234", "jay@gmail.com"));
        return users;
    }
}
