import React from "react";
import styled from "styled-components";
import TimeAgo from "react-timeago";
import engStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { useParams } from "react-router-dom";

import Text from "@Style/Text";
import Badge from "@Style/Badge";
import Avatar from "@Style/Avatar";

import MarkdownConverted from "@InputBox/CommentInputBox/MarkdownConverted";

const formatter = buildFormatter(engStrings);

const CommentViewBox = ({ commentId, owner, createdAt, content, author, deleteHandler }) => {
  const { issueId } = useParams();

  const onDelete = () => {
    deleteHandler({ issueId, commentId });
    window.location.reload();
  };

  return (
    <>
      <Wrapper>
        <Avatar src={owner ? author.avatarUrl : author.avatar_url}></Avatar>
        <CommentGroup>
          <CommentHeader owner={owner ? true : false}>
            <CommentText>
              <Text fontWeight="extraBold">{author.nickname}</Text>
              <Text color="gray4">
                commented <TimeAgo date={createdAt} formatter={formatter} />
              </Text>
            </CommentText>
            <CommentAction>
              {owner && (
                <Badge backgroundColor="babyblue" borderColor="gray3" color="gray4">
                  Owner
                </Badge>
              )}
              <Text color="gray4" isClick>
                Edit
              </Text>
              {!owner && (
                <Text color="gray4" onClick={onDelete} isClick>
                  Delete
                </Text>
              )}
            </CommentAction>
          </CommentHeader>
          <CommentContent>
            <MarkdownConverted content={content} isComment />
          </CommentContent>
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
  padding: 15px;
  overflow: visible;
  word-break: break-all;
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
