import React, { useState } from "react";
import styled from "styled-components";

import FilterList from "@FilterButton/FilterList";
import HeaderSwitch from "@Table/HeaderSwitch/HeaderSwitch";

const IssueListHeader = ({ allCheckedHandler, openCount, closeCount }) => {
  const [bChecked, setChecked] = useState(false);

  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    allCheckedHandler(target.checked);
  };

  return (
    <>
      <LeftBoxsWrapper>
        <Checkbox checked={bChecked} onChange={(e) => checkHandler(e)} />
        <HeaderSwitch openCount={openCount} closeCount={closeCount} open={open} close={close} />
      </LeftBoxsWrapper>
      <FilterButtonWrapper>
        <FilterList isFilter bChecked={bChecked} />
      </FilterButtonWrapper>
    </>
  );
};

const LeftBoxsWrapper = styled.div`
  display: flex;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 15px;
`;

const FilterButtonWrapper = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
`;

export default IssueListHeader;
