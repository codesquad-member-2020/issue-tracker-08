import React from "react";
import styled from "styled-components";

import Text from "@Style/Text";

const PersonalInputBox = ({ title, widthSize, value }) => {
  return (
    <>
      <Wrap>
        <Text children={title} fontWeight="bold" />
        {value ? <InputBox type="text" widthSize={widthSize} value={value} readOnly /> : <InputBox type="text" widthSize={widthSize} />}
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
`;

export default PersonalInputBox;
