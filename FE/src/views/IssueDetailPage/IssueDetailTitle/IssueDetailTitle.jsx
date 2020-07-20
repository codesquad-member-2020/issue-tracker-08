import React, { useState } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import TimeAgo from "react-timeago";
import engStrings from "react-timeago/lib/language-strings/en";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";

import Text from "@Style/Text";
import Badge from "@Style/Badge";
import Button from "@Style/Button";

import PersonalInputBox from "@InputBox/PersonalInputBox";

const formatter = buildFormatter(engStrings);

const IssueDetailTitle = ({ title, id, isOpen, nickname, createdAt, numberOfComment, titleSaveHandler }) => {
  let history = useHistory();
  const { issueId } = useParams();

  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [titleContent, setTitleContent] = useState(title);

  const onSetIsTitleEdit = () => setIsTitleEdit(!isTitleEdit);

  const onTitleContent = ({ target }) => setTitleContent(target.value);

  const onTitleSave = () => {
    const params = { title: titleContent };
    onSetIsTitleEdit();
    titleSaveHandler({ issueId, params });
    window.location.reload();
  };

  const onPassCreateIssuePage = () => history.push(`/CreateIssuePage`);

  return (
    <>
      <TitleWrapper>
        {!isTitleEdit ? (
          <>
            <Title>
              <Text fontSize="xxl" fontWeight="semiBold">
                {title}
              </Text>
              <Text color="gray3" fontSize="xxl" fontWeight="semiBold">
                &nbsp;#{issueId}
              </Text>
            </Title>
            <ButtonWrapper>
              <Button backgroundColor="white" color="black" fontSize="sm" bold onClick={onSetIsTitleEdit}>
                Edit
              </Button>
              <Button fontSize="sm" bold style={{ marginLeft: "5px" }} onClick={onPassCreateIssuePage}>
                New issue
              </Button>
            </ButtonWrapper>
          </>
        ) : (
          <>
            <Title>
              <PersonalInputBox value={titleContent} widthSize={"600px"} isIssueTitle onChange={onTitleContent}></PersonalInputBox>
            </Title>
            <ButtonWrapper>
              <Button backgroundColor="white" color="black" fontSize="sm" bold onClick={onTitleSave} disabled={titleContent ? false : true}>
                Save
              </Button>
              <Button
                fontSize="sm"
                color="blue"
                backgroundColor="white"
                borderColor="white"
                bold
                style={{ marginLeft: "5px" }}
                onClick={onSetIsTitleEdit}
              >
                Cancel
              </Button>
            </ButtonWrapper>
          </>
        )}
      </TitleWrapper>
      <Description>
        {isOpen ? (
          <Badge big style={{ marginRight: "5px" }}>
            <OpenIcon>
              <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
            </OpenIcon>
            Open
          </Badge>
        ) : (
          <Badge big backgroundColor="red" style={{ marginRight: "5px" }}>
            <CloseIssueIcon>
              <path
                fillRule="evenodd"
                d="M1.5 8a6.5 6.5 0 0110.65-5.003.75.75 0 00.959-1.153 8 8 0 102.592 8.33.75.75 0 10-1.444-.407A6.5 6.5 0 011.5 8zM8 12a1 1 0 100-2 1 1 0 000 2zm0-8a.75.75 0 01.75.75v3.5a.75.75 0 11-1.5 0v-3.5A.75.75 0 018 4zm4.78 4.28l3-3a.75.75 0 00-1.06-1.06l-2.47 2.47-.97-.97a.749.749 0 10-1.06 1.06l1.5 1.5a.75.75 0 001.06 0z"
              ></path>
            </CloseIssueIcon>
            Closed
          </Badge>
        )}
        <Text fontWeight="bold" color="gray4">
          {nickname}
        </Text>
        <Text color="gray4">
          &nbsp;opened this issue <TimeAgo date={createdAt} formatter={formatter} /> · {numberOfComment} comments
        </Text>
      </Description>
    </>
  );
};

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 36px;
  margin: 5px 0;
`;
const Title = styled.div``;
const ButtonWrapper = styled.div`
  display: flex;
`;

const Description = styled.div`
  padding: 7px 0;
  margin: 5px 0;
`;

const OpenIcon = styled.svg`
  width: 16px;
  height: 16px;
  fill: ${({ theme }) => theme.colors.white};
  overflow: visible;
  margin-right: 15px;
`;

const CloseIssueIcon = styled.svg`
  width: 16px;
  height: 16px;
  fill: ${({ theme }) => theme.colors.white};
  overflow: visible;
  margin-right: 5px;
  padding-top: 2px;
`;

export default IssueDetailTitle;
