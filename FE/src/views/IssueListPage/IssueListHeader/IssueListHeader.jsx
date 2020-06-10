import React from "react";
import styled from "styled-components";

import FilterButton from "@FilterButton/FilterButton";

const IssueListHeader = () => {
  return (
    <>
      <Checkbox />
      <FilterButtonWrapper>
        <FilterButton filter={true} title="Author"></FilterButton>
        <FilterButton filter={true} title="Label"></FilterButton>
        <FilterButton filter={true} title="Milestones"></FilterButton>
        <FilterButton filter={true} title="Assignee"></FilterButton>
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
