import React from "react";
import styled from "styled-components";
import TimeAgo from "react-timeago";
import engStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

import Text from "@Style/Text";
import Badge from "@Style/Badge";

const formatter = buildFormatter(engStrings);

const CommentViewBox = ({ owner }) => {
  return (
    <>
      <Wrapper>
        <Avatar src="https://avatars1.githubusercontent.com/u/30427711?s=88&u=0f6f414055ea0bec267856e35e8902b9f728fe1a&v=4"></Avatar>
        <CommentGroup>
          <CommentHeader owner={owner ? true : false}>
            <CommentText>
              <Text fontWeight="extraBold">choisohyun</Text>
              <Text color="gray4">
                commented <TimeAgo date="May 25, 2020" formatter={formatter} />
              </Text>
            </CommentText>
            <CommentAction>
              {owner && (
                <Badge backgroundColor="babyblue" borderColor="gray3" color="gray4">
                  Owner
                </Badge>
              )}
              <Text color="gray4">Edit</Text>
              <Text color="gray4">Delete</Text>
            </CommentAction>
          </CommentHeader>
          <CommentContent></CommentContent>
        </CommentGroup>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  padding: 16px 0;
  margin: 0 16px;
  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    display: block;
    width: 2px;
    content: "";
    background-color: ${({ theme }) => theme.colors.gray2};
  }
`;

const Avatar = styled.img`
  position: absolute;
  left: -72px;
  z-index: 1;
  width: 40px;
  height: 40px;
  border-radius: 3px;
`;

const CommentGroup = styled.div`
  width: 100%;
  z-index: 2;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray4};
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-color: ${({ theme }) => theme.colors.skyblue};
  flex: auto;
  border-radius: 3px;
  margin-left: -16px;
  &::before {
    color: ${({ theme }) => theme.colors.skyblue};
    position: absolute;
    top: 28px;
    left: -28px;
    content: "◀︎";
  }
`;

const CommentHeader = styled.div`
  width: 100%;
  height: 40px;
  background-color: ${({ theme, owner }) => (owner ? theme.colors.babyblue : theme.colors.gray2)};
  border-bottom-color: #c0d3eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
  padding-left: 16px;
  color: #586069;
  flex-direction: row;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray3};
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
`;

const CommentContent = styled.div`
  width: 100%;
  height: 200px;
  padding: 15px;
  overflow: visible;
`;

const CommentText = styled.div`
  display: flex;
  ${Text} {
    margin-right: 10px;
  }
`;

const CommentAction = styled.div`
  ${Text} {
    margin-left: 10px;
  }
`;

export default CommentViewBox;
