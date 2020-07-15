import React from "react";
import styled from "styled-components";

import Text from "@Style/Text";

const PersonalInputBox = ({ type, errorMsg, isRandom, title, widthSize, value, backgroundColor, placeholder, onChange, maxLength, isIssueTitle }) => {
  return (
    <>
      <Wrap>
        <Text children={title} fontWeight="bold" />
        {isRandom ? (
          <InputBox
            type="text"
            widthSize={widthSize}
            value={value}
            backgroundColor={backgroundColor}
            placeholder={placeholder}
            onChange={onChange}
            maxLength={maxLength}
          />
        ) : (
          <InputBox
            type={type ? type : "text"}
            widthSize={widthSize}
            defaultValue={value}
            backgroundColor={backgroundColor}
            placeholder={placeholder}
            onChange={onChange}
            maxLength={maxLength}
            isIssueTitle={isIssueTitle}
          />
        )}
        {errorMsg && <MessageBox children={errorMsg} fontSize="sm" color="red" />}
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  text-align: initial;
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
`;

const InputBox = styled.input`
  border: none;
  margin: ${(props) => (props.isIssueTitle ? "" : "5px 0")};
  height: 40px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  width: ${({ widthSize }) => (widthSize ? widthSize : "")};
  background-color: ${({ theme, backgroundColor }) => (backgroundColor ? theme.colors[backgroundColor] : "")};
  &:focus {
    background-color: white;
    outline: none;
    background-color: white;
    border-color: ${({ theme }) => theme.colors.blue};
    box-shadow: inset 0 1px 2px ${({ theme }) => theme.colors.babyblue}, 0 0 0 0.2em ${({ theme }) => theme.colors.skyblue};
  }
`;

const MessageBox = styled(Text)`
  height: 20px;
`;

export default PersonalInputBox;
