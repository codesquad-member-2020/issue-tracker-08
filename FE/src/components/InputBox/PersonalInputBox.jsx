import React from "react";
import styled from "styled-components";
import Text from "@Style/Text";

const PersonalInputBox = ({ title }) => {
  return (
    <Wrap>
      <Text children={title} fontWeight="bold" />
      <InputBox type="text" />
    </Wrap>
  );
};

export default PersonalInputBox;

const Wrap = styled.div`
  text-align: initial;
  display: flex;
  flex-direction: column;
`;

const InputBox = styled.input`
  border: none;
  margin: 5px 0 20px 0;
  height: 28px;
  /* box-shadow: 0 0 2px 0 ${({ theme }) => theme.colors.black}; */
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
`;
