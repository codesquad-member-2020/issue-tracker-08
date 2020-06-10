import React from "react";
import styled from "styled-components";
import LabelIcon from "@material-ui/icons/Label";
import EventNoteIcon from "@material-ui/icons/EventNote";

import Button from "@Style/Button";

const NavigationButton = () => {
  return (
    <Wrapper>
      <LeftButton color="gray" backgroudColor="white">
        <LabelIcon fontSize="small" />
        Labels
      </LeftButton>
      <RightButton color="gray" backgroudColor="white">
        <EventNoteIcon fontSize="small" />
        Milestones
      </RightButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const LeftButton = styled(Button)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const RightButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

export default NavigationButton;
