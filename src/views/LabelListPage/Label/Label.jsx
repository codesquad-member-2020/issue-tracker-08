import React from "react";
import styled from "styled-components";

import Text from "@Style/Text";
import Badge from "@Style/Badge";
import Button from "@Style/Button";

const Label = () => {
  return (
    <>
      <Wrapper>
        <BadgeWrapper>
          <Badge big color="white" backgroundColor="red" style={{ display: "inline-block" }}>
            bug
          </Badge>
        </BadgeWrapper>
        <TextWrapper>
          <Text color="gray4" lineHeight="30px">
            Something isn't working
          </Text>
        </TextWrapper>
        <ButtonWrapper>
          <Button color="gray4" backgroundColor="white" fontSize="sm" borderColor="white">
            Edit
          </Button>
          <Button color="gray4" backgroundColor="white" fontSize="sm" borderColor="white">
            Delete
          </Button>
        </ButtonWrapper>
      </Wrapper>
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

export default Label;
