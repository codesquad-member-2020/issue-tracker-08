import React from "react";
import styled from "styled-components";

import Text from "@Style/Text";

const PersonalInputBox = ({ title, widthSize, value, backgroundColor, placeholder }) => {
  return (
    <>
      <Wrap>
        <Text children={title} fontWeight="bold" />
        {value ? (
          <InputBox type="text" widthSize={widthSize} value={value} backgroundColor={backgroundColor} placeholder={placeholder} readOnly />
        ) : (
          <InputBox type="text" widthSize={widthSize} backgroundColor={backgroundColor} placeholder={placeholder} />
        )}
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  text-align: initial;
  display: flex;
  flex-direction: column;
`;

const InputBox = styled.input`
  border: none;
  margin: 5px 0 20px 0;
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

export default PersonalInputBox;
