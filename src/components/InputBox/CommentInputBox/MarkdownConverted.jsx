import React from "react";
import styled from "styled-components";
import MarkdownIt from "markdown-it";

const MarkdownConverted = ({ content, isRawOpen }) => {
  const text = content ? content : "Nothing to preview";
  const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight(str, lang) {},
  });

  const convertedText = mdParser.render(text);

  return <ConvertedText dangerouslySetInnerHTML={{ __html: convertedText }} isRawOpen={isRawOpen} />;
};

const ConvertedText = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  display: ${(props) => (props.isRawOpen ? "none" : "block")};
  width: -webkit-fill-available;
  height: 100%;
  min-height: 200px;
`;

export default MarkdownConverted;

// string 형태의 changedText를 html 형태로 decode해주는 함수 (현재는 사용하지 않지만 혹시 필요할 수도 있어서 남겨둠)

//   const htmlDecode = (input) => {
//     var e = document.createElement("div");
//     e.innerHTML = input;
//     return e.childNodes.length === 0 ? "" : e.childNodes[0];
//   };

//   const changedHtml = htmlDecode(changedText);
