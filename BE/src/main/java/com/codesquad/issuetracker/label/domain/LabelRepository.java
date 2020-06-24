package com.codesquad.issuetracker.label.domain;

import com.codesquad.issuetracker.issue.domain.IssueId;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LabelRepository extends CrudRepository<Label, LabelId> {

    public Label findFirstByOrderByIdDesc();

    @Query(value = "SELECT l.label_id, l.color, l.description, l.is_font_color_black, l.name FROM Label l JOIN tag t ON l.label_id = t.label_id JOIN issue i ON t.issue_id = i.issue_id WHERE i.issue_id= :issueId", nativeQuery = true)
    List<Label> findAllByIssueId(IssueId issueId);
}
