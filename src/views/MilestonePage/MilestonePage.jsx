import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Button from "@Style/Button";

import Header from "@Header/Header";
import NavigationButton from "@NavigationButton/NavigationButton";
import Milestone from "@MilestonePage/Milestone/Milestone";
import MilestoneHeader from "@MilestonePage/MilestoneHeader/MilestoneHeader";
import Table from "@Table/Table";

const MilestonePage = () => {
  let history = useHistory();
  const MilestoneList = (
    <>
      <Milestone title="FE 1주차" date="June 12, 2020"></Milestone>
      <Milestone title="BE 1주차" date="June 12, 2020" description="설명입니다."></Milestone>
      <Milestone title="BE 1주차" date="June 12, 2020" description="설명입니다."></Milestone>
    </>
  );

  return (
    <>
      <Header />
      <NavBarWrap>
        <NavBar>
          <NavigationButton isMilestone />
          <Button onClick={() => history.push(`/CreateMilestonePage/isCreate`)}>New Milestone</Button>
        </NavBar>
      </NavBarWrap>
      <Table tableHeader={<MilestoneHeader openCount={5} closeCount={3} />} tableList={MilestoneList} />
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

export default MilestonePage;
