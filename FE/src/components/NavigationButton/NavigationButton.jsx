import React from "react";
import styled from "styled-components";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import EventNoteIcon from "@material-ui/icons/EventNote";
import { useHistory } from "react-router-dom";

import Button from "@Style/Button";

const NavigationButton = ({ isLabel, isMilestone }) => {
  let history = useHistory();

  const onPassLabelListPage = () => history.push(`/LabelListPage`);
  const onPassMilestonePage = () => history.push(`/MilestonePage`);

  return (
    <>
      <Wrapper>
        <LeftButton color={isLabel ? "white" : "gray4"} backgroundColor={isLabel ? "blue" : "white"} onClick={onPassLabelListPage} isLabel={isLabel}>
          <LocalOfferOutlinedIcon fontSize="small" />
          Labels
        </LeftButton>
        <RightButton
          color={isMilestone ? "white" : "gray4"}
          backgroundColor={isMilestone ? "blue" : "white"}
          onClick={onPassMilestonePage}
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
