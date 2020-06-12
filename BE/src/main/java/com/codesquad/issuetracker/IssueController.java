package com.codesquad.issuetracker;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
public class IssueController {

    @GetMapping("/issues")
    public IssueBoard issueList() {
        Issue issueBE = Issue.builder()
                .id(1L)
                .author(new User("Jay", "https://avatars1.githubusercontent.com/u/33659848?s=460&v=4"))
                .assignees(Arrays.asList(
                        new User("Jay", "https://avatars1.githubusercontent.com/u/33659848?s=460&v=4"),
                        new User("Ever", "https://avatars1.githubusercontent.com/u/56301069?s=460&v=4")))
                .labels(Arrays.asList(
                        new Label("BE", "BE 이슈", "#0366d6", true),
                        new Label("FE", "FE 이슈", "#72c2c9", false)))
                .createdAt(LocalDateTime.now())
                .title("[BE] GitHub OAuth")
                .numberOfComment(1)
                .isOpen(true)
                .build();

        Issue issueFE = Issue.builder()
                .id(2L)
                .author(new User("Hoo", "https://avatars2.githubusercontent.com/u/30427711?s=460&u=0f6f414055ea0bec267856e35e8902b9f728fe1a&v=4"))
                .assignees(Arrays.asList(
                        new User("Hoo", "https://avatars2.githubusercontent.com/u/30427711?s=460&u=0f6f414055ea0bec267856e35e8902b9f728fe1a&v=4"),
                        new User("Sally", "https://avatars3.githubusercontent.com/u/45891045?s=460&u=8603b06db3cddd4f864bd55455f78c28558dfc8b&v=4")))
                .labels(Arrays.asList(
                        new Label("FE 리뷰 요청","FE 리뷰 요청 용 라벨", "#d4c5f9", true),
                        new Label("Feature", "기능 구현", "#f7b4b6", false)))
                .createdAt(LocalDateTime.parse("2020-06-07 17:59:32", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .title("[FE] 컨벤션 논의")
                .numberOfComment(3)
                .isOpen(true)
                .build();

        List<Issue> issues = new ArrayList<>();
        issues.add(issueBE);
        issues.add(issueFE);

        return new IssueBoard(issues.size(), 3, 4, 2, issues);
    }

    @GetMapping("/labels")
    public List<Label> labelList() {
        List<Label> labels = new ArrayList<>();
        labels.add(new Label("BE", "BE 이슈", "#0366d6", true));
        labels.add(new Label("FE", "FE 이슈", "#72c2c9", false));
        labels.add(new Label("FE 리뷰 요청","FE 리뷰 요청 용 라벨", "#d4c5f9", true));
        labels.add(new Label("Feature", "기능 구현", "#f7b4b6", false));
        return labels;
    }

    @GetMapping("/milestones")
    public MilestoneBoard milestoneList() {
        List<Milestone> milestones = new ArrayList<>();
        milestones.add(new Milestone(1L, "FE 1주차", "FE 1주차 마일스톤", LocalDateTime.parse("2020-06-20 00:00:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")), LocalDateTime.now(), true, null, 68, 8, 17));
        milestones.add(new Milestone(2L, "BE 1주차", "BE 1주차 계획",  LocalDateTime.parse("2020-06-13 00:00:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")), LocalDateTime.now().minusDays(1), true, null, 0, 1, 0));
        return new MilestoneBoard(milestones.size(), 1, milestones);
    }

    @GetMapping("/milestones/{milestone_id}/issues")
    public Milestone detailMilestone(@PathVariable(value = "milestone_id") Long milestoneId) {
        User author = new User("Hoo", "https://avatars2.githubusercontent.com/u/30427711?s=460&u=0f6f414055ea0bec267856e35e8902b9f728fe1a&v=4");

        List<User> assignees = new ArrayList<>();
        assignees.add(new User("Hoo", "https://avatars2.githubusercontent.com/u/30427711?s=460&u=0f6f414055ea0bec267856e35e8902b9f728fe1a&v=4"));
        assignees.add(new User("Sally", "https://avatars3.githubusercontent.com/u/45891045?s=460&u=8603b06db3cddd4f864bd55455f78c28558dfc8b&v=4"));

        List<Label> labels = new ArrayList<>();
        labels.add(new Label("FE 리뷰 요청","FE 리뷰 요청 용 라벨", "#d4c5f9", true));
        labels.add(new Label("Feature", "기능 구현", "#f7b4b6", false));

        List<Issue> issues = new ArrayList<>();
        issues.add(new Issue(2L, author, assignees, labels, null, null, LocalDateTime.parse("2020-06-07 17:59:32", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")), "[FE] 컨벤션 논의", null, 3, true));

        return new Milestone(milestoneId, "FE 1주차", "FE 1주차 마일스톤", LocalDateTime.parse("2020-06-15 00:00:00", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")), LocalDateTime.now(), true, issues, 68, 8, 17);
    }

    @GetMapping("/users")
    public List<User> userList() {
        List<User> users = new ArrayList<>();
        users.add(new User("Jay", "https://avatars1.githubusercontent.com/u/33659848?s=460&v=4"));
        users.add(new User("Ever", "https://avatars1.githubusercontent.com/u/56301069?s=460&v=4"));
        users.add(new User("Hoo", "https://avatars2.githubusercontent.com/u/30427711?s=460&u=0f6f414055ea0bec267856e35e8902b9f728fe1a&v=4"));
        users.add(new User("Sally", "https://avatars3.githubusercontent.com/u/45891045?s=460&u=8603b06db3cddd4f864bd55455f78c28558dfc8b&v=4"));
        return users;
    }

    @GetMapping("/issues/{issue_id}")
    public Issue detailIssue(@PathVariable(value = "issue_id") Long issueId) {
        User commentAuthor = new User("Ever", "https://avatars1.githubusercontent.com/u/56301069?s=460&v=4");

        Milestone milestone = Milestone.builder()
                .id(2L)
                .title("BE 1주차 계획")
                .achievementRate(0)
                .isOpen(true)
                .build();

        List<Comment> comments = Collections.singletonList(
                new Comment(1L, commentAuthor, "어플리케이션 등록 필요", LocalDateTime.parse("2020-06-11 22:56:25", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")), false));

        return Issue.builder()
                .id(1L)
                .author(new User("Jay", "https://avatars1.githubusercontent.com/u/33659848?s=460&v=4"))
                .assignees(Arrays.asList(
                        new User("Jay", "https://avatars1.githubusercontent.com/u/33659848?s=460&v=4"),
                        new User("Ever", "https://avatars1.githubusercontent.com/u/56301069?s=460&v=4")))
                .labels(Arrays.asList(
                        new Label("BE", "BE 이슈", "#0366d6", true),
                        new Label("FE", "FE 이슈", "#72c2c9", false)))
                .comments(comments)
                .milestone(milestone)
                .createdAt(LocalDateTime.parse("2020-06-11 14:30:30", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .title("[BE] GitHub OAuth")
                .content("### OAuth\n" +
                        "- GitHub OAuth 로그인\n" +
                        "- GitHub API 사용\n" +
                        "- JWT\n" +
                        "- 인터셉터")
                .numberOfComment(comments.size())
                .isOpen(true)
                .build();
    }
}
