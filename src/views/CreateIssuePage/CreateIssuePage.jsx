import React from "react";
import styled from "styled-components";

import CommentInputBox from "@InputBox/CommentInputBox/CommentInputBox";
import FilterVerticalList from "@FilterButton/FilterVerticalList";
import Header from "@Header/Header";

const CreateIssuePage = (props) => {
  const passIssueListPage = () => {
    props.history.push(`/IssueListPage`);
  };

  return (
    <>
      <Header history={props.history} />
      <ContentWrapper>
        <Content>
          <IssueBoxWrapper>
            <CommentInputBox isIssue={true} onPass={passIssueListPage} />
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

export default CreateIssuePage;