package com.codesquad.issuetracker.issue.infrastructure;

import com.codesquad.issuetracker.issue.domain.Filter;
import com.codesquad.issuetracker.issue.domain.QIssue;
import com.codesquad.issuetracker.label.domain.LabelId;
import com.codesquad.issuetracker.milestone.domain.MilestoneId;
import com.codesquad.issuetracker.user.domain.UserId;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;

public class IssuePredicate {

    public static Predicate search(Filter filter) {
        QIssue issueGroup = QIssue.issue;

        BooleanBuilder builder = new BooleanBuilder();
        builder.and(issueGroup.isOpen.eq(filter.getIsOpen()));

        if (filter.getAuthor() != null) {
            builder.and(issueGroup.authorId.eq(new UserId(filter.getAuthor())));
        }

        if (filter.getLabel() != null) {
            builder.and(issueGroup.labels.contains(new LabelId(filter.getLabel())));
        }

        if (filter.getMilestone() != null) {
            builder.and(issueGroup.milestoneId.eq(new MilestoneId(filter.getMilestone())));
        }

        if (filter.getAssignee() != null) {
            builder.and(issueGroup.assignees.contains(new UserId(filter.getAssignee())));
        }

        return builder;
    }
}
