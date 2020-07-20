import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import IssueDetailTitle from "@IssueDetailPage/IssueDetailTitle/IssueDetailTitle";
import CommentList from "@IssueDetailPage/CommentList/CommentList";
import FilterVerticalList from "@FilterButton/FilterVerticalList";
import CommentInputBox from "@InputBox/CommentInputBox/CommentInputBox";
import Header from "@Header/Header";
import CommentViewBox from "@CommentViewBox/CommentViewBox";
import { getDetailIssue, changeIssueStatus, patchIssueTitle, postComment, putComment, deleteComment } from "@Modules/issue";

const IssueDetailPage = ({
  getDetailIssue,
  detailIssue,
  loadingDetailIssue,
  patchIssueTitle,
  postComment,
  putComment,
  deleteComment,
  changeIssueStatus,
}) => {
  const { issueId } = useParams();
  const [editCommentInfo, setEditCommentInfo] = useState({ isEdit: false, editComment: null });

  const checkEditCommentInfo = (commentId) => editCommentInfo.isEdit && editCommentInfo.editComment === commentId;

  const changeIssueOpenClose = () => {
    (async () => {
      try {
        await changeIssueStatus(issueId);
      } catch (e) {
        console.log(e);
      }
    })();

    window.location.reload();
  };

  const postHandler = ({ issueId, params }) => {
    (async () => {
      try {
        await postComment({ issueId, params });
      } catch (e) {
        console.log(e);
      }
    })();
  };

  const editClickHandler = (commentId) => setEditCommentInfo({ isEdit: true, editComment: commentId });

  const cancelClickHandler = (commentId) => setEditCommentInfo({ isEdit: false, editComment: commentId });

  const editCommentHandler = ({ issueId, commentId, params }) => {
    (async () => {
      try {
        await putComment({ issueId, commentId, params });
      } catch (e) {
        console.log(e);
      }
    })();

    setEditCommentInfo({ isEdit: false, editComment: commentId });

    detailIssue.comments.forEach(({ comment }) => {
      if (comment.id.commentId === commentId) {
        comment.content = params.content;
      }
    });
  };

  const deleteHandler = ({ issueId, commentId }) => {
    (async () => {
      try {
        await deleteComment({ issueId, commentId });
      } catch (e) {
        console.log(e);
      }
    })();
  };

  const titleSaveHandler = ({ issueId, params }) => {
    (async () => {
      try {
        await patchIssueTitle({ issueId, params });
      } catch (e) {
        console.log(e);
      }
    })();
  };

  useEffect(() => {
    (async () => {
      try {
        await getDetailIssue(issueId);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <>
      <Header />
      <ContentWrapper>
        {!loadingDetailIssue && detailIssue && (
          <>
            <IssueDetailTitle titleSaveHandler={titleSaveHandler} />
            <Content>
              <CommentViewBoxWrapper>
                <CommentViewBox owner createdAt={detailIssue.createdAt} content={detailIssue.content} author={detailIssue.author} />
                <CommentList
                  detailIssue={detailIssue}
                  checkEditCommentInfo={checkEditCommentInfo}
                  editCommentHandler={editCommentHandler}
                  editClickHandler={editClickHandler}
                  cancelClickHandler={cancelClickHandler}
                  deleteHandler={deleteHandler}
                />
                <CommentInputBox postHandler={postHandler} changeIssueOpenClose={changeIssueOpenClose} />
              </CommentViewBoxWrapper>
              <FilterVerticalList optionData={{ assignees: detailIssue.assignees, labels: detailIssue.labels, milestone: detailIssue.milestone }} />
            </Content>
          </>
        )}
      </ContentWrapper>
    </>
  );
};

const ContentWrapper = styled.div`
  display: grid;
  justify-content: center;
  margin-bottom: 50px;
`;

const Content = styled.div`
  width: 65%;
  max-width: 1000px;
  min-width: 760px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.colors.gray2};
  margin-top: 16px;
  padding-left: 72px;
`;

const CommentViewBoxWrapper = styled.div`
  width: 75%;
`;

export default connect(
  ({ issue, loading }) => ({
    detailIssue: issue.detailIssue,
    statusCode: issue.statusCode,
    loadingDetailIssue: loading["issue/GET_DETAIL_ISSUE"],
    loadingStatusCode: loading["issue/CHANGE_ISSUE_STATUS_SUCCESS"],
  }),
  {
    getDetailIssue,
    changeIssueStatus,
    patchIssueTitle,
    postComment,
    putComment,
    deleteComment,
  }
)(IssueDetailPage);
