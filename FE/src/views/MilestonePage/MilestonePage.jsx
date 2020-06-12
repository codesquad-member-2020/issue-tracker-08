import React from "react";
import styled from "styled-components";

import Button from "@Style/Button";

import Header from "@Header/Header";
import NavigationButton from "@NavigationButton/NavigationButton";
import Milestone from "@MilestonePage/Milestone/Milestone";
import MilestoneHeader from "@MilestonePage/MilestoneHeader/MilestoneHeader";
import Table from "@Table/Table";

const MilestonePage = (props) => {
  const MilestoneList = (
    <>
      <Milestone title="FE 1주차" date="June 12, 2020" history={props.history}></Milestone>
      <Milestone title="BE 1주차" date="June 12, 2020" description="설명입니다." history={props.history}></Milestone>
      <Milestone title="BE 1주차" date="June 12, 2020" description="설명입니다." history={props.history}></Milestone>
    </>
  );

  return (
    <>
      <Header history={props.history} />
      <NavBarWrap>
        <NavBar>
          <NavigationButton history={props.history} isMilestone />
          <Button onClick={() => props.history.push(`/CreateMilestonePage/isCreate`)}>New Milestone</Button>
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
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default MilestonePage;
