import React from "react";
import styled from "styled-components";
import MarkdownIt from "markdown-it";

const MarkdownConverted = ({ content, isRawOpen, isComment }) => {
  const text = content ? content : "Nothing to preview";
  const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight(str, lang) {},
  });

  const convertedText = mdParser.render(text);

  return <ConvertedText dangerouslySetInnerHTML={{ __html: convertedText }} isRawOpen={isRawOpen} isComment={isComment} />;
};

const ConvertedText = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  display: ${(props) => (props.isRawOpen ? "none" : "block")};
  width: -webkit-fill-available;
  height: 100%;
  min-height: ${(props) => (props.isComment ? "" : "200px")};
  & pre {
    background-color: #f6f8fa;
    padding: 5px;
    border-radius: 3px;
  }
  & code {
    background-color: #f3f4f4;
    padding: 5px;
    border-radius: 3px;
  }
`;

export default MarkdownConverted;
