import React, { useState } from "react";
import styled from "styled-components";

import FilterVerticalList from "@FilterButton/FilterVerticalList";

const IssueListHeader = ({ allCheckedHandler }) => {
  const [bChecked, setChecked] = useState(false);

  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    allCheckedHandler(target.checked);
  };

  return (
    <>
      <Checkbox checked={bChecked} onChange={(e) => checkHandler(e)} />
      <FilterButtonWrapper>
        <FilterVerticalList isFilter bChecked={bChecked} />
      </FilterButtonWrapper>
    </>
  );
};

const Checkbox = styled.input.attrs({ type: "checkbox" })``;

const FilterButtonWrapper = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
`;

export default IssueListHeader;
