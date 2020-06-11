import React from "react";

import FilterVerticalList from "@FilterButton/FilterVerticalList";
import Header from "@Header/Header";

const CreateIssuePage = (props) => {
  return (
    <>
      <Header history={props.history} />
      <FilterVerticalList />
    </>
  );
};

export default CreateIssuePage;
