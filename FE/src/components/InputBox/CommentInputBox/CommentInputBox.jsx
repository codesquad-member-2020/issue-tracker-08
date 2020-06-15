import React, { useState } from "react";
import styled from "styled-components";

import MarkdownConverted from "./MarkdownConverted";

import Button from "@Style/Button";

const MarkdownInputBox = ({ isIssue, onPass }) => {
  const [isRawOpen, setIsRawOpen] = useState(true);
  const [rawContent, setRawContent] = useState("");

  const onSetRawContent = (e) => {
    setRawContent(e.target.value);
  };

  return (
    <>
      <Wrapper>
        <Avatar src="https://avatars3.githubusercontent.com/u/45891045?s=460&u=8603b06db3cddd4f864bd55455f78c28558dfc8b&v=4"></Avatar>
        <CommentGroup>
          {isIssue && <Title type="text" placeholder="Title" />}
          <ButtonTab>
            <WriteButton onClick={() => setIsRawOpen(true)} isRawOpen={isRawOpen}>
              Write
            </WriteButton>
            <PreviewButton onClick={() => setIsRawOpen(false)} isRawOpen={isRawOpen}>
              Preview
            </PreviewButton>
          </ButtonTab>
          <CommentContent>
            <RawContent type="text" onChange={onSetRawContent} placeholder="Leave a comment" isRawOpen={isRawOpen} />
            <MarkdownConverted content={rawContent} isRawOpen={isRawOpen} />
          </CommentContent>
          <ButtonWrap>
            {isIssue && (
              <Button backgroundColor="white" color="black" borderColor="white" onClick={onPass}>
                Cancle
              </Button>
            )}
            <Button onClick={onPass}>Submit new issue</Button>
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
  background-color: ${({ theme }) => theme.colors.white};
`;

const PreviewButton = styled.button`
  padding: 5px 10px;
  border: 1px ${(props) => (props.isRawOpen ? "none" : "solid")} ${({ theme }) => theme.colors.gray2};
  border-bottom: none;
  background-color: ${({ theme }) => theme.colors.white};
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
  justify-content: space-between;
`;

export default MarkdownInputBox;
