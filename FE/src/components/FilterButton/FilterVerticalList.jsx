import React from "react";
import styled from "styled-components";

import FilterButton from "@FilterButton/FilterButton";

const FilterVerticalList = () => {
  return (
    <>
      <Wrapper>
        <FilterButton title="Assignees" data={assignees}></FilterButton>
        <FilterButton title="Labels" data={labels}></FilterButton>
        <FilterButton title="Milestone" data={labels}></FilterButton>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 221px;
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: space-around;
  margin: 10px;
`;

export default FilterVerticalList;

const assignees = [
  {
    name: "jay",
    color: "#fff",
    img: "https://avatars1.githubusercontent.com/u/30427711?s=60&v=4",
    description: "Good for newcomers",
  },
  {
    name: "sally",
    color: "#fff",
    img: "https://avatars1.githubusercontent.com/u/30427711?s=60&v=4",
    description: "Extra attention is needed",
  },
  {
    name: "ever",
    color: "#fff",
    img: "https://avatars1.githubusercontent.com/u/30427711?s=60&v=4",
    description: "",
  },
];

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
];
