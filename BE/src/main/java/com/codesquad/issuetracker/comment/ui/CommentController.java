package com.codesquad.issuetracker.comment.ui;

import com.codesquad.issuetracker.comment.application.CommentService;
import com.codesquad.issuetracker.comment.domain.CommentId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/issues/{issue_id}/comments")
@RestController
public class CommentController {

    private final CommentService commentService;

    @PostMapping("")
    public ResponseEntity<String> create(@PathVariable("issue_id") Long issueId,
                                         @RequestBody String content,
                                         HttpServletRequest request) {

        Long commentId = commentService.getNextIdentity();
//        Long userId = (Long) request.getAttribute("id");
        Long userId = 1L;
        CommentId compositeCommentId = new CommentId(commentId, issueId, userId);

        commentService.save(compositeCommentId, content);

        return new ResponseEntity<>("댓글 생성 성공", HttpStatus.CREATED);
    }

    @PutMapping("/{comment_id}")
    public ResponseEntity<String> update(@PathVariable("issue_id") Long issueId,
                                         @PathVariable("comment_id") Long commentId,
                                         @RequestBody String content,
                                         HttpServletRequest request) {

//        Long userId = (Long) request.getAttribute("id");
        Long userId = 1L;
        CommentId compositeCommentId = new CommentId(commentId, issueId, userId);

        commentService.update(compositeCommentId, content);

        return new ResponseEntity<>("댓글 수정 성공", HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{comment_id}")
    public ResponseEntity<Void> changeStatus(@PathVariable("issue_id") Long issueId,
                                               @PathVariable("comment_id") Long commentId,
                                               HttpServletRequest request) {

//        Long userId = (Long) request.getAttribute("id");
        Long userId = 1L;
        CommentId compositeCommentId = new CommentId(commentId, issueId, userId);

        commentService.changeStatus(compositeCommentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{comment_id}")
    public ResponseEntity<Void> delete(@PathVariable("issue_id") Long issueId,
                                         @PathVariable("comment_id") Long commentId,
                                         HttpServletRequest request) {

//        Long userId = (Long) request.getAttribute("id");
        Long userId = 1L;
        CommentId compositeCommentId = new CommentId(commentId, issueId, userId);

        commentService.delete(compositeCommentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

