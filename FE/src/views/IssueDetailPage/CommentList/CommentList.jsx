import React from "react";

import CommentViewBox from "@CommentViewBox/CommentViewBox";
import CommentInputBox from "@InputBox/CommentInputBox/CommentInputBox";

const CommentList = ({ detailIssue, checkEditCommentInfo, editCommentHandler, editClickHandler, cancelClickHandler, deleteHandler }) => {
  return (
    <>
      {detailIssue.comments.map((comment) => {
        const {
          comment: {
            id: { commentId },
            createdAt,
            content,
          },
          user,
        } = comment;

        return checkEditCommentInfo(commentId) ? (
          <CommentInputBox
            key={commentId}
            commentId={commentId}
            editContent={content}
            author={user}
            editCommentHandler={editCommentHandler}
            cancelClickHandler={cancelClickHandler}
          />
        ) : (
          <CommentViewBox
            key={commentId}
            commentId={commentId}
            createdAt={createdAt}
            content={content}
            author={user}
            editClickHandler={editClickHandler}
            deleteHandler={deleteHandler}
          />
        );
      })}
    </>
  );
};

export default CommentList;
