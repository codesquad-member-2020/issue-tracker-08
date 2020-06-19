import React from "react";
import styled from "styled-components";
import LabelIcon from "@material-ui/icons/Label";
import EventNoteIcon from "@material-ui/icons/EventNote";
import { useHistory } from "react-router-dom";

import Button from "@Style/Button";

const NavigationButton = ({ isLabel, isMilestone }) => {
  let history = useHistory();
  return (
    <>
      <Wrapper>
        <LeftButton
          color={isLabel ? "white" : "gray4"}
          backgroundColor={isLabel ? "blue" : "white"}
          onClick={() => history.push(`/LabelListPage`)}
          isLabel={isLabel}
        >
          <LabelIcon fontSize="small" />
          Labels
        </LeftButton>
        <RightButton
          color={isMilestone ? "white" : "gray4"}
          backgroundColor={isMilestone ? "blue" : "white"}
          onClick={() => history.push(`/MilestonePage`)}
          isMilestone={isMilestone}
        >
          <EventNoteIcon fontSize="small" />
          Milestones
        </RightButton>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const LeftButton = styled(Button)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  &:hover {
    background-color: ${(props) => (props.isLabel ? "" : props.theme.colors.gray1)};
  }
`;

const RightButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  &:hover {
    background-color: ${(props) => (props.isMilestone ? "" : props.theme.colors.gray1)};
  }
`;

export default NavigationButton;
