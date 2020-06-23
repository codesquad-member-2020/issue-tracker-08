import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import Button from "@Style/Button";

import Header from "@Header/Header";
import NavigationButton from "@NavigationButton/NavigationButton";
import Milestone from "@MilestonePage/Milestone/Milestone";
import MilestoneHeader from "@MilestonePage/MilestoneHeader/MilestoneHeader";
import Table from "@Table/Table";
import { getMilestone, patchMilestone, deleteMilestone } from "@Modules/milestone";

const MilestonePage = ({ getMilestone, patchMilestone, deleteMilestone, milestones, loadingMilestone }) => {
  let history = useHistory();
  const onPassCreateMilestonePage = () => history.push(`/CreateMilestonePage`);

  const isLoaded = !loadingMilestone && milestones;

  const openCount = isLoaded && milestones.numberOfOpenMilestone;
  const closeCount = isLoaded && milestones.numberOfClosedMilestone;

  const [isOpenView, setIsOpenView] = useState(true);
  const open = () => setIsOpenView(true);
  const close = () => setIsOpenView(false);

  const MilestoneOpenList = () => (
    <>
      {isLoaded &&
        milestones.milestones
          .filter((milestone) => milestone.isOpen)
          .map((milestone) => <Milestone key={milestone.id} milestone={milestone}></Milestone>)}
    </>
  );

  const MilestoneCloseList = () => (
    <>
      {isLoaded &&
        milestones.milestones
          .filter((milestone) => !milestone.isOpen)
          .map((milestone) => <Milestone key={milestone.id} milestone={milestone}></Milestone>)}
    </>
  );

  let location = useLocation();

  const getHandler = async () => {
    try {
      await getMilestone();
      console.log("render!");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getHandler();
  }, [getMilestone, patchMilestone, deleteMilestone, location]);

  const deleteConfirm = () => {
    return confirm("Are you sure?");
  };

  const patchHandler = (milestoneId) => {
    const fn = async () => {
      try {
        await patchMilestone(milestoneId);
        getHandler();
      } catch (e) {
        console.log(e);
      }
    };
    fn();
  };

  const deleteHandler = (milestoneId) => {
    if (!deleteConfirm()) return;
    const fn = async () => {
      try {
        await deleteMilestone(milestoneId);
        getHandler();
      } catch (e) {
        console.log(e);
      }
    };
    fn();
  };

  return (
    <>
      <Header />
      <NavBarWrap>
        <NavBar>
          <NavigationButton isMilestone />
          <Button onClick={onPassCreateMilestonePage}>New Milestone</Button>
        </NavBar>
      </NavBarWrap>
      <Table
        tableHeader={<MilestoneHeader openCount={openCount} closeCount={closeCount} open={open} close={close} />}
        tableList={
          isOpenView ? <MilestoneOpenList loadingMilestone={loadingMilestone} /> : <MilestoneCloseList loadingMilestone={loadingMilestone} />
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
  min-width: 760px;
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
    patchMilestone,
    deleteMilestone,
  }
)(MilestonePage);
