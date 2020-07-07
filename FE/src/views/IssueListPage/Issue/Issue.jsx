import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import EventNoteIcon from "@material-ui/icons/EventNote";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import TimeAgo from "react-timeago";
import koreaStrings from "react-timeago/lib/language-strings/ko";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

import Text from "@Style/Text";
import Badge from "@Style/Badge";

const formatter = buildFormatter(koreaStrings);

const Issue = ({ issue }) => {
  let history = useHistory();

  const onPassIssueDetailPage = () => history.push(`/IssueDetailPage/${issue.id}`);

  const badgeList = issue.labels.map((label) => (
    <Badge key={label.name} backgroundColor={label.color} color={label.isFontColorBlack ? "black" : "white"}>
      {label.name}
    </Badge>
  ));

  const avatarList = issue.assignees.map((assignee) => <Avatar className="avatar" key={assignee.id} src={assignee.avatarUrl}></Avatar>);
  const assignedUserList = issue.assignees.reduce((acc, cur) => {
    if (!acc) return cur.nickname;
    return acc + " and " + cur.nickname;
  }, "");

  return (
    <>
      <Wrapper>
        <CheckboxWrapper>
          <Checkbox />
        </CheckboxWrapper>
        <OpenIcon />
        <IssueWrapper>
          <Title onClick={onPassIssueDetailPage}>
            <Text fontWeight="bold" isClick as="a">
              {issue.title}
            </Text>
            {badgeList}
          </Title>
          <Info>
            <Text fontSize="sm">
              #{issue.id} {issue.isOpen ? "opened" : "closed"}
            </Text>
            <Text fontSize="sm">
              <TimeAgo date={issue.createdAt} formatter={formatter} />
            </Text>
            <Text fontSize="sm">by {issue.author.nickname}</Text>
            <Text fontSize="sm">
              <Milestone>
                <EventNoteIcon style={{ fontSize: 15 }} />
                스프린트2
              </Milestone>
            </Text>
          </Info>
        </IssueWrapper>
        {issue.assignees && (
          <>
            <AvatarWrapper>
              {avatarList}
              <MessageBox className="message">Assigned to {assignedUserList}</MessageBox>
            </AvatarWrapper>
          </>
        )}
        <CommentWrapper>
          {issue.comments && (
            <>
              <ChatBubbleOutlineIcon style={{ fontSize: 15 }} />
              {issue.comments}
            </>
          )}
        </CommentWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
  position: relative;
`;

const CheckboxWrapper = styled.div`
  padding-right: 10px;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })``;

const OpenIcon = styled(ErrorOutlineIcon)`
  color: ${({ theme }) => theme.colors.green};
  margin-right: 15px;
`;

const IssueWrapper = styled.div``;

const Title = styled.div`
  margin-bottom: 5px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-right: 5px;
  }
`;

const Milestone = styled.span`
  display: flex;
  align-items: center;
  &:hover {
    color: ${({ theme }) => theme.colors.gray2};
    cursor: pointer;
  }
`;

const AvatarWrapper = styled.div`
  position: absolute;
  right: 10%;
  &:hover .avatar {
    margin-left: 3px;
  }
  &:hover .message {
    display: block;
  }
`;

const Avatar = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 3px;
  margin-left: -15px;
`;

const MessageBox = styled.div`
  position: fixed;
  right: 18%;
  display: none;
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  padding: 5px;
  font-size: 10px;
  border-radius: 3px;
`;

const CommentWrapper = styled.span`
  position: absolute;
  left: 95%;
  font-size: 15px;
  display: flex;
  align-items: center;
  &:hover {
    color: ${({ theme }) => theme.colors.blue};
    cursor: pointer;
  }
`;

export default Issue;
