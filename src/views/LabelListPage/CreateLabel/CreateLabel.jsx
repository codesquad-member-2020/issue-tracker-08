import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CachedRoundedIcon from "@material-ui/icons/CachedRounded";

import Badge from "@Style/Badge";
import Button from "@Style/Button";
import Text from "@Style/Text";
import { isDark, randomColor } from "@/lib/getRandomColor";

import PersonalInputBox from "@InputBox/PersonalInputBox";

const CreateLabel = () => {
  const [color, setColor] = useState(randomColor);

  const colorReset = () => {
    setColor(randomColor);
  };

  return (
    <>
      <Wrapper>
        <Contents>
          <BadgeWrapper>
            <Badge big backgroundColor={color} style={{ display: "inline-block" }}>
              Label preview
            </Badge>
          </BadgeWrapper>
          <LabelInputWrapper>
            <PersonalInputBox title="Label name" />
            <PersonalInputBox title="Description" widthSize="320px" />
            <ColorBoxWrapper>
              <Text children="Color" fontWeight="bold" />
              <ColorInputBoxWrapper>
                <ColorResetButton onClick={colorReset} backgroundColor={color}>
                  <CachedRoundedIcon fontSize="small" />
                </ColorResetButton>
                <PersonalInputBox widthSize="80px" value={color} />
              </ColorInputBoxWrapper>
            </ColorBoxWrapper>
            <BurrontWrapper>
              <Button color="black" backgroundColor="white">
                Cancel
              </Button>
              <Button disabled>Create Label</Button>
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
`;

const Contents = styled.form`
  width: 65%;
  height: 150px;
  padding: 16px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.gray1};
  border: 1px solid ${({ theme }) => theme.colors.gray3};
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
