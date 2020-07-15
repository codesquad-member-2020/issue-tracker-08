import React from "react";
import styled from "styled-components";

import MarkdownConverted from "@InputBox/CommentInputBox/MarkdownConverted";

const InputContent = ({ rawOpen, isRawOpen, markdownOpen, inputRef, editContent, onSetRawContent, rawContent }) => {
  return (
    <>
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
    </>
  );
};

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

const CommentContent = styled.div`
  width: 100%;
  padding: 10px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray2};
  overflow: visible;
`;

const RawContent = styled.textarea`
  padding: 5px;
  background-color: ${({ theme }) => theme.colors.gray1};
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 5px;
  display: ${(props) => (props.isRawOpen ? "block" : "none")};
  width: fill-available;
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

export default InputContent;
