package com.codesquad.issuetracker;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;


@RequiredArgsConstructor
@RestController
public class IssueController {

    @GetMapping("/issues")
    public Object issueList() {
        List<Assignee> assignees = new ArrayList<>();
        assignees.add(new Assignee("Jay", "jay.png"));
        assignees.add(new Assignee("Ever", "ever.jpeg"));

        List<Tag> tags = new ArrayList<>();
        tags.add(new Tag("BE", "#0366d6"));
        tags.add(new Tag("FE", "#72c2c9"));

        Issue issueBE = new Issue(1L, "Jay", assignees, tags, LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")), "[BE] GitHub OAuth", 1, true);

        assignees.clear();
        assignees.add(new Assignee("Hoo", "Hoo.png"));
        assignees.add(new Assignee("Sally", "sally.jpeg"));

        tags.clear();
        tags.add(new Tag("BE 리뷰 요청", "#d4c5f9"));
        tags.add(new Tag("Feature", "#f7b4b6"));

        Issue issueFE = new Issue(2L, "Hoo", assignees, tags, "2020-06-07 17:59:32", "[FE] 컨벤션 논의", 3, true);

        List<Issue> issues = new ArrayList<>();
        issues.add(issueBE);
        issues.add(issueFE);

        return new GitHub(issues);
    }
}
