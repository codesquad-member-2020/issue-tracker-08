import React, { useState } from "react";
import styled from "styled-components";
import EventNoteIcon from "@material-ui/icons/EventNote";
import DoneIcon from "@material-ui/icons/Done";

import Text from "@Style/Text";

const MilestoneHeader = ({ openCount, closeCount, open, close }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isClose, setIsClose] = useState(false);

  const onOpen = () => {
    open();
    setIsOpen(true);
    setIsClose(false);
  };
  const onClose = () => {
    close();
    setIsOpen(false);
    setIsClose(true);
  };

  return (
    <>
      <Wrapper>
        <HeaderLink as="a" onClick={onOpen} isOpen={isOpen}>
          <EventNoteIcon fontSize="small" />
          {openCount} Open
        </HeaderLink>
        <HeaderLink as="a" onClick={onClose} isOpen={isClose}>
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
  color: ${(props) => (props.isOpen ? props.theme.colors.black : props.theme.colors.gray3)};
  font-weight: ${(props) => (props.isOpen ? props.theme.fontWeights.bold : "")};
  &:hover {
    color: ${(props) => (props.isOpen ? "" : props.theme.colors.black)};
  }
`;

export default MilestoneHeader;
