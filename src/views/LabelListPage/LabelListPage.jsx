import React, { useState } from "react";
import styled from "styled-components";

import Button from "@Style/Button";

import Label from "@LabelListPage/Label/Label";
import LabelListHeader from "@LabelListPage/LabelListHeader/LabelListHeader";
import NavigationButton from "@NavigationButton/NavigationButton";
import CreateLabel from "@LabelListPage/CreateLabel/CreateLabel";
import Header from "@Header/Header";
import Table from "@Table/Table";

const LabelListPage = (props) => {
  const [isOpenNewLabel, setIsOpenNewLabel] = useState(false);

  const labelList = (
    <>
      <Label></Label>
      <Label></Label>
    </>
  );

  return (
    <>
      <Header history={props.history} />
      <NavBarWrap>
        <NavBar>
          <NavigationButton history={props.history} isLabel />
          <Button onClick={() => setIsOpenNewLabel(!isOpenNewLabel)}>New Label</Button>
        </NavBar>
      </NavBarWrap>
      {isOpenNewLabel && <CreateLabel />}
      <Table tableHeader={<LabelListHeader count={2} />} tableList={labelList} />
    </>
  );
};

const NavBarWrap = styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const NavBar = styled.nav`
  width: 65%;
  max-width: 1000px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default LabelListPage;
