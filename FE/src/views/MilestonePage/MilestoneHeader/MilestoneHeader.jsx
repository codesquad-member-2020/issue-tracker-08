import React from "react";
import styled from "styled-components";
import EventNoteIcon from "@material-ui/icons/EventNote";
import DoneIcon from "@material-ui/icons/Done";

import Text from "@Style/Text";

const MilestoneHeader = ({ openCount, closeCount }) => {
  return (
    <>
      <Wrapper>
        <HeaderLink fontWeight="bold" as="a">
          <EventNoteIcon fontSize="small" />
          {openCount} Open
        </HeaderLink>
        <HeaderLink fontWeight="bold" as="a">
          <DoneIcon fontSize="small" />
          {closeCount} Close
        </HeaderLink>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderLink = styled(Text)`
  display: flex;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  svg {
    margin-right: 5px;
  }
`;

export default MilestoneHeader;
