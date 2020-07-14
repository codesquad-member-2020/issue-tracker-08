import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import Button from "@Style/Button";
import Avatar from "@Style/Avatar";

import MarkdownConverted from "@InputBox/CommentInputBox/MarkdownConverted";
import getCookieValue from "@Lib/getCookieValue";
import useDebounce from "@Hooks/useDebounce";

const CommentInputBox = ({ isIssue, onPass, submitHandler, postHandler, commentId, editContent, author }) => {
  const { issueId } = useParams();
  const [isRawOpen, setIsRawOpen] = useState(true);
  const [rawContent, setRawContent] = useState(editContent ? editContent : "");
  const [titleContent, setTitleContent] = useState("");

  // const debounceRawContent = useDebounce(rawContent);

  const onSetTitleContent = ({ target }) => setTitleContent(target.value);

  const onSetRawContent = ({ target }) => setRawContent(target.value);

  const rawOpen = () => setIsRawOpen(true);

  const markdownOpen = () => setIsRawOpen(false);

  let params = {
    title: titleContent,
    content: rawContent,
    assignees: [],
    labels: [],
    milestoneId: null,
  };

  const onComment = () => {
    const params = { content: rawContent };
    postHandler({ issueId, params });
    window.location.reload();
  };

  return (
    <>
      <Wrapper>
        <Avatar src={author ? author.avatarUrl : decodeURIComponent(getCookieValue("avatarUrl"))}></Avatar>
        <CommentGroup>
          {isIssue && <Title type="text" placeholder="Title" onChange={onSetTitleContent} />}
          <ButtonTab>
            <WriteButton onClick={rawOpen} isRawOpen={isRawOpen}>
              Write
            </WriteButton>
            <PreviewButton onClick={markdownOpen} isRawOpen={isRawOpen}>
              Preview
            </PreviewButton>
          </ButtonTab>
          <CommentContent>
            <RawContent type="text" onChange={onSetRawContent} placeholder="Leave a comment" isRawOpen={isRawOpen} />
            <MarkdownConverted content={rawContent} isRawOpen={isRawOpen} />
          </CommentContent>
          <ButtonWrap isIssue={isIssue}>
            {isIssue ? (
              <>
                <Button backgroundColor="white" color="black" borderColor="white" onClick={onPass}>
                  Cancel
                </Button>
                <Button onClick={onPass} disabled={titleContent ? false : true} onClick={() => submitHandler(params)}>
                  Submit new issue
                </Button>
              </>
            ) : (
              <>
                <Button backgroundColor="white" color="black" style={{ marginRight: "5px" }}>
                  <CloseIssueIcon>
                    <path
                      fillRule="evenodd"
                      d="M1.5 8a6.5 6.5 0 0110.65-5.003.75.75 0 00.959-1.153 8 8 0 102.592 8.33.75.75 0 10-1.444-.407A6.5 6.5 0 011.5 8zM8 12a1 1 0 100-2 1 1 0 000 2zm0-8a.75.75 0 01.75.75v3.5a.75.75 0 11-1.5 0v-3.5A.75.75 0 018 4zm4.78 4.28l3-3a.75.75 0 00-1.06-1.06l-2.47 2.47-.97-.97a.749.749 0 10-1.06 1.06l1.5 1.5a.75.75 0 001.06 0z"
                    ></path>
                  </CloseIssueIcon>
                  Close issue
                </Button>
                <Button onClick={onComment} disabled={!rawContent}>
                  Comment
                </Button>
              </>
            )}
          </ButtonWrap>
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
`;

const CommentGroup = styled.div`
  width: 100%;
  z-index: 2;
  color: ${({ theme }) => theme.colors.gray4};
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  flex: auto;
  border-radius: 3px;
  margin-left: -16px;
  &::before {
    color: ${({ theme }) => theme.colors.gray3};
    position: absolute;
    top: 28px;
    left: -28px;
    content: "◀︎";
  }
`;

const Title = styled.input`
  background-color: ${({ theme }) => theme.colors.gray1};
  margin: 5px;
  padding: 5px 5px 5px 10px;
  width: -webkit-fill-available;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 5px;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  &:focus {
    background-color: white;
    outline: none;
    background-color: white;
    border-color: ${({ theme }) => theme.colors.blue};
    box-shadow: inset 0 1px 2px ${({ theme }) => theme.colors.babyblue}, 0 0 0 0.1em ${({ theme }) => theme.colors.skyblue};
  }
`;

const CommentContent = styled.div`
  width: 100%;
  padding: 10px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray2};
  overflow: visible;
`;

const ButtonTab = styled.div`
  padding: 10px 0 0 15px;
  display: flex;
`;

const WriteButton = styled.button`
  padding: 5px 10px;
  border: 1px ${(props) => (props.isRawOpen ? "solid" : "none")} ${({ theme }) => theme.colors.gray2};
  border-bottom: none;
  background-color: ${(props) => props.theme.colors.white};
  cursor: pointer;
`;

const PreviewButton = styled.button`
  padding: 5px 10px;
  border: 1px ${(props) => (props.isRawOpen ? "none" : "solid")} ${({ theme }) => theme.colors.gray2};
  border-bottom: none;
  background-color: ${(props) => props.theme.colors.white};
  cursor: pointer;
`;

const RawContent = styled.textarea`
  padding: 5px;
  background-color: ${({ theme }) => theme.colors.gray1};
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 5px;
  display: ${(props) => (props.isRawOpen ? "block" : "none")};
  width: -webkit-fill-available;
  min-height: 200px;
  max-height: 300px;
  resize: vertical;
  overflow-y: scroll;
  &:focus {
    background-color: white;
    outline: none;
    background-color: white;
    border-color: ${({ theme }) => theme.colors.blue};
    box-shadow: inset 0 1px 2px ${({ theme }) => theme.colors.babyblue}, 0 0 0 0.2em ${({ theme }) => theme.colors.skyblue};
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  padding: 10px;
  justify-content: ${(props) => (props.isIssue ? "space-between" : "flex-end")};
  background-color: ${({ theme }) => theme.colors.white};
`;

const CloseIssueIcon = styled.svg`
  width: 16px;
  height: 16px;
  fill: ${({ theme }) => theme.colors.red};
  overflow: visible;
  margin-right: 5px;
`;

export default CommentInputBox;
