import React, { useState } from "react";
import styled from "styled-components";
import CachedRoundedIcon from "@material-ui/icons/CachedRounded";

import Badge from "@Style/Badge";
import Button from "@Style/Button";
import Text from "@Style/Text";
import { isDark, randomColor } from "@/lib/getRandomColor";

import PersonalInputBox from "@InputBox/PersonalInputBox";

const CreateLabel = ({ isEdit, close, defaultColor, isColorDark, name, description }) => {
  const [backgroundColor, setbackgroundColor] = useState(defaultColor ? defaultColor : randomColor);
  const [isBackDark, setBDark] = useState(isColorDark ? isColorDark : isDark);
  const [inputName, setInputName] = useState(name ? name : "");

  const colorReset = () => {
    setbackgroundColor(randomColor);
    setBDark(isDark);
  };

  const onChangeName = ({ target }) => {
    setInputName(target.value);
  const createHandler = () => {
    close();
  };

  return (
    <>
      <Wrapper>
        <Contents isEdit={isEdit}>
          <BadgeWrapper>
            <Badge big backgroundColor={backgroundColor} color={isBackDark ? "white" : "black"} style={{ display: "inline-block" }}>
              {inputName ? inputName : "Label preview"}
            </Badge>
          </BadgeWrapper>
          <LabelInputWrapper>
            <PersonalInputBox title="Label name" placeholder="Label name" value={name ? name : ""} onChange={onChangeName} />
            <PersonalInputBox title="Description" placeholder="Description (optional)" value={description ? description : ""} widthSize="320px" />
            <ColorBoxWrapper>
              <Text children="Color" fontWeight="bold" />
              <ColorInputBoxWrapper>
                <ColorResetButton onClick={colorReset} backgroundColor={backgroundColor}>
                  <CachedRoundedIcon fontSize="small" style={{ color: isBackDark ? "white" : "black" }} />
                </ColorResetButton>
                <PersonalInputBox widthSize="80px" value={backgroundColor} />
              </ColorInputBoxWrapper>
            </ColorBoxWrapper>
            <BurrontWrapper>
              <Button color="black" backgroundColor="white" onClick={close}>
                Cancel
              </Button>
              <Button disabled>{isEdit ? "Save Changes" : "Create Label"}</Button>
            </BurrontWrapper>
          </LabelInputWrapper>
        </Contents>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Contents = styled.form`
  width: ${({ isEdit }) => (isEdit ? "100%" : "65%")};
  max-width: 1000px;
  height: 150px;
  padding: 16px;
  border-radius: 3px;
  background-color: ${({ theme, isEdit }) => (isEdit ? theme.colors.white : theme.colors.gray1)};
  border: 1px solid ${({ theme }) => theme.colors.gray2};
`;

const BadgeWrapper = styled.div`
  height: 45%;
`;

const LabelInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ColorBoxWrapper = styled.div`
  text-align: initial;
  display: flex;
  flex-direction: column;
`;

const ColorInputBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ColorResetButton = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 3px;
  margin: 5px 3px 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BurrontWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default CreateLabel;
