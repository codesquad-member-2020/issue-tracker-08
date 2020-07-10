import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import CommentInputBox from "@InputBox/CommentInputBox/CommentInputBox";
import FilterVerticalList from "@FilterButton/FilterVerticalList";
import Header from "@Header/Header";
import { postIssue } from "@Modules/issue";

const CreateIssuePage = ({ postIssue, detailIssue, loadingIssue }) => {
  let history = useHistory();

  const passIssueListPage = () => history.push(`/IssueListPage`);

  const passIssueDetailPage = () => history.push(`/IssueDetailPage/${detailIssue.id}`);

  const submitHandler = (params) => {
    (async () => {
      try {
        await postIssue(params);
      } catch (e) {
        console.error(e);
      }
    })();
    if (!loadingIssue && detailIssue) passIssueDetailPage();
  };

  return (
    <>
      <Header />
      <ContentWrapper>
        <Content>
          <IssueBoxWrapper>
            <CommentInputBox isIssue onPass={passIssueListPage} submitHandler={submitHandler} />
          </IssueBoxWrapper>
          <FilterVerticalList />
        </Content>
      </ContentWrapper>
    </>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding-left: 72px;
`;

const IssueBoxWrapper = styled.div`
  width: 75%;
`;

export default connect(
  ({ issue, loading }) => ({
    detailIssue: issue.detailIssue,
    loadingIssue: loading["issue/POST_ISSUE"],
  }),
  {
    postIssue,
  }
)(CreateIssuePage);
