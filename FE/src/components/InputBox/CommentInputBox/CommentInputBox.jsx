import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import Avatar from "@Style/Avatar";

import CreateButtons from "@InputBox/CommentInputBox/CreateButtons/CreateButtons";
import MarkdownConverted from "@InputBox/CommentInputBox/MarkdownConverted";
import SwitchButton from "@InputBox/CommentInputBox/SwitchButton/SwitchButton";
import getCookieValue from "@Lib/getCookieValue";
import useDebounce from "@Hooks/useDebounce";

const CommentInputBox = ({
  isIssue,
  submitHandler,
  postHandler,
  editCommentHandler,
  cancelClickHandler,
  changeIssueOpenClose,
  commentId,
  editContent,
  author,
  issueCloseInfo,
}) => {
  const { issueId } = useParams();
  const [isRawOpen, setIsRawOpen] = useState(true);
  const [rawContent, setRawContent] = useState(editContent ? editContent : "");
  const [titleContent, setTitleContent] = useState("");
  const inputRef = useRef();

  // const debounceRawContent = useDebounce(rawContent);

  const onSetTitleContent = ({ target }) => setTitleContent(target.value);

  const onSetRawContent = ({ target }) => setRawContent(target.value);

  const rawOpen = () => setIsRawOpen(true);

  const markdownOpen = () => setIsRawOpen(false);

  const checkIssueClose = () => issueCloseInfo.isClose && issueCloseInfo.issueId === issueId;

  const submitParams = {
    title: titleContent,
    content: rawContent,
    assignees: [],
    labels: [],
    milestoneId: null,
  };

  const editParams = { content: rawContent };

  const changeIssueClickHandler = () => changeIssueOpenClose();

  const submiClicktHandler = () => submitHandler(submitParams);

  const editClickHandler = () => editCommentHandler({ issueId, commentId, params: editParams });

  const onComment = () => {
    const params = { content: rawContent };
    postHandler({ issueId, params });
    window.location.reload();
  };

  useEffect(() => {
    if (editContent) {
      inputRef.current.focus();
      inputRef.current.selectionStart = inputRef.current.value.length;
      inputRef.current.selectionEnd = inputRef.current.value.length;
    }
  }, []);

  return (
    <>
      <Wrapper>
        <Avatar src={author ? author.avatarUrl : decodeURIComponent(getCookieValue("avatarUrl"))} />
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
            <RawContent
              type="text"
              ref={inputRef}
              defaultValue={editContent}
              placeholder="Leave a comment"
              onChange={onSetRawContent}
              isRawOpen={isRawOpen}
            />
            <MarkdownConverted content={rawContent} isRawOpen={isRawOpen} />
          </CommentContent>
          <ButtonWrap isIssue={isIssue}>
            {isIssue || editContent ? (
              <CreateButtons
                isIssue={isIssue}
                titleContent={titleContent}
                rawContent={rawContent}
                submiClicktHandler={submiClicktHandler}
                editClickHandler={editClickHandler}
                cancelClickHandler={cancelClickHandler}
              />
            ) : (
              <SwitchButton
                rawContent={rawContent}
                checkIssueClose={checkIssueClose}
                changeIssueClickHandler={changeIssueClickHandler}
                onComment={onComment}
              />
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

export default CommentInputBox;
