package com.codesquad.issuetracker.comment.ui;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/issues/{issue_id}/comments")
@RestController
public class CommentController {

    @PostMapping("")
    public ResponseEntity<String> create(@PathVariable(value = "issue_id") Long issueId) {
        return null;
    }

    @PutMapping("/{comment_id}")
    public ResponseEntity<String> update(@PathVariable(value = "issue_id") Long issueId,
                                         @PathVariable(value = "comment_id") Long commentId) {
        return null;
    }

    @PatchMapping("/{comment_id}")
    public ResponseEntity<String> changeStatus(@PathVariable(value = "issue_id") Long issueId,
                                               @PathVariable(value = "comment_id") Long commentId) {
        return null;
    }

    @DeleteMapping("/{comment_id}")
    public ResponseEntity<String> delete(@PathVariable(value = "issue_id") Long issueId,
                                         @PathVariable(value = "comment_id") Long commentId) {
        return null;
    }
}

