import React, { useState } from "react";
import styled from "styled-components";

import FilterButton from "@FilterButton/FilterButton";

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
        <FilterButton filter title="Author" data={labels}></FilterButton>
        <FilterButton filter title="Label" data={labels}></FilterButton>
        <FilterButton filter title="Milestones" data={labels}></FilterButton>
        <FilterButton filter title="Assignee" data={labels}></FilterButton>
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

const labels = [
  {
    name: "good first issue",
    color: "#7057ff",
    description: "Good for newcomers",
  },
  {
    name: "help wanted",
    color: "#008672",
    description: "Extra attention is needed",
  },
  {
    name: "priority: critical",
    color: "#b60205",
    description: "",
  },
  {
    name: "priority: critical",
    color: "#b60205",
    description: "",
  },
  {
    name: "priority: critical",
    color: "#b60205",
    description: "",
  },
];
