import React from "react";
import styled from "styled-components";

import FilterVerticalList from "@FilterButton/FilterVerticalList";
import CommentInputBox from "@InputBox/CommentInputBox/CommentInputBox";
import Header from "@Header/Header";
import CommentViewBox from "@CommentViewBox/CommentViewBox";

const IssueDetailPage = (props) => {
  return (
    <>
      <Header history={props.history} />
      <ContentWrapper>
        <Content>
          <CommentViewBoxWrapper>
            <CommentViewBox owner />
            <CommentViewBox />
            <CommentViewBox />
            <CommentInputBox />
          </CommentViewBoxWrapper>
          <FilterVerticalList />
        </Content>
      </ContentWrapper>
    </>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
`;

const Content = styled.div`
  width: 65%;
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.colors.gray2};
  margin-top: 16px;
  padding-left: 72px;
`;

const CommentViewBoxWrapper = styled.div`
  width: 75%;
`;

export default IssueDetailPage;
