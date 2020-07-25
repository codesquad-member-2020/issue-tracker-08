import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import EventNoteIcon from "@material-ui/icons/EventNote";
import DoneIcon from "@material-ui/icons/Done";

import Text from "@Style/Text";

const HeaderSwitch = ({ openCount, closeCount, onSwitch }) => {
  let location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initBOpen = searchParams.get("isOpen") === "false" ? false : true;

  const [bOpen, setBOpen] = useState(initBOpen);

  const onOpenClose = (isOpen) => {
    onSwitch(isOpen);
    setBOpen(isOpen);
  };

  return (
    <>
      <Wrapper>
        <HeaderLink as="a" onClick={() => onOpenClose(true)} isOpen={bOpen}>
          <EventNoteIcon fontSize="small" />
          {openCount} Open
        </HeaderLink>
        <HeaderLink as="a" onClick={() => onOpenClose(false)} isOpen={!bOpen}>
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
  color: ${({ isOpen, theme }) => (isOpen ? theme.colors.black : theme.colors.gray3)};
  font-weight: ${({ isOpen, theme }) => (isOpen ? theme.fontWeights.bold : "")};
  &:hover {
    color: ${({ isOpen, theme }) => (isOpen ? "" : theme.colors.black)};
  }
`;

export default HeaderSwitch;
