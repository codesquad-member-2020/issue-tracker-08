import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "@Style/Button";

import Header from "@Header/Header";
import NavigationButton from "@NavigationButton/NavigationButton";
import Milestone from "@MilestonePage/Milestone/Milestone";
import MilestoneHeader from "@MilestonePage/MilestoneHeader/MilestoneHeader";
import Table from "@Table/Table";
import { getMilestone } from "@Modules/milestone";

const MilestonePage = ({ getMilestone, milestones, loadingMilestone }) => {
  let history = useHistory();
  const openCount = !loadingMilestone && milestones && milestones.numberOfOpenMilestone;
  const closeCount = !loadingMilestone && milestones && milestones.numberOfClosedMilestone;

  const [isOpenView, setIsOpenView] = useState(true);
  const open = () => {
    setIsOpenView(true);
  };
  const close = () => {
    setIsOpenView(false);
  };

  const MilestoneOpenList = () => (
    <>
      {!loadingMilestone &&
        milestones &&
        milestones.milestones
          .filter((milestone) => milestone.isOpen)
          .map((milestone) => <Milestone key={milestone.id} milestone={milestone}></Milestone>)}
    </>
  );

  const MilestoneCloseList = () => (
    <>
      {!loadingMilestone &&
        milestones &&
        milestones.milestones
          .filter((milestone) => !milestone.isOpen)
          .map((milestone) => <Milestone key={milestone.id} milestone={milestone}></Milestone>)}
    </>
  );

  useEffect(() => {
    const fn = async () => {
      try {
        await getMilestone();
      } catch (e) {
        console.log(e);
      }
    };
    fn();
  }, [getMilestone]);

  return (
    <>
      <Header />
      <NavBarWrap>
        <NavBar>
          <NavigationButton isMilestone />
          <Button onClick={() => history.push(`/CreateMilestonePage`)}>New Milestone</Button>
        </NavBar>
      </NavBarWrap>
      <Table
        tableHeader={<MilestoneHeader openCount={openCount} closeCount={closeCount} open={open} close={close} />}
        tableList={
          isOpenView ? (
            <MilestoneOpenList milestones={milestones} loadingMilestone={loadingMilestone} />
          ) : (
            <MilestoneCloseList milestones={milestones} loadingMilestone={loadingMilestone} />
          )
        }
      />
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

export default connect(
  ({ milestone, loading }) => ({
    milestones: milestone.milestones,
    loadingMilestone: loading["milestone/GET_MILESTONE"],
  }),
  {
    getMilestone,
  }
)(MilestonePage);
