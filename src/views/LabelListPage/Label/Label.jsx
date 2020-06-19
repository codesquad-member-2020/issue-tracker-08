import React, { useState } from "react";
import styled from "styled-components";

import Text from "@Style/Text";
import Badge from "@Style/Badge";
import Button from "@Style/Button";

import { deleteLabel } from "@Modules/label";
import CreateLabel from "@LabelListPage/CreateLabel/CreateLabel";

const Label = ({ label: { name, description, color, isFontColorBlack } }) => {
  const [isOpenEditLabel, setIsOpenEditLabel] = useState(false);

  const editLabelOpenHandler = () => setIsOpenEditLabel(!isOpenEditLabel);

  const deleteHandler = () => {
    const fn = async () => {
      try {
        await deleteLabel(name);
      } catch (e) {
        console.log(e);
      }
    };
    fn();
  };

  return (
    <>
      {isOpenEditLabel ? (
        <CreateLabel isEdit close={editLabelOpenHandler} defaultColor={color} isColorDark={isFontColorBlack} name={name} description={description} />
      ) : (
        <Wrapper>
          <BadgeWrapper>
            <Badge big color={isFontColorBlack ? "white" : "black"} backgroundColor={color} style={{ display: "inline-block" }}>
              {name}
            </Badge>
          </BadgeWrapper>
          <TextWrapper>
            <Text color="gray4" lineHeight="30px">
              {description}
            </Text>
          </TextWrapper>
          <ButtonWrapper>
            <Button color="gray4" backgroundColor="white" fontSize="sm" borderColor="white" onClick={editLabelOpenHandler}>
              Edit
            </Button>
            <Button color="gray4" backgroundColor="white" fontSize="sm" borderColor="white" onClick={deleteHandler}>
              Delete
            </Button>
          </ButtonWrapper>
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
`;

const BadgeWrapper = styled.div`
  width: 30%;
`;

const TextWrapper = styled.div`
  width: 50%;
`;

const ButtonWrapper = styled.div`
  width: 20%;
  justify-content: flex-end;
  display: flex;
`;

export default React.memo(Label);
