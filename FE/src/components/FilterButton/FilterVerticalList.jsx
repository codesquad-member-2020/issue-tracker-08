import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import FilterButton from "@FilterButton/FilterButton";
import { getUser } from "@Modules/user";
import { getLabel } from "@Modules/label";
import { getMilestone } from "@Modules/milestone";

const FilterVerticalList = ({ users, labels, milestones, getUser, getLabel, getMilestone, loadingUser, loadingLabel, loadingMilestone }) => {

  useEffect(() => {
    const fn = async () => {
      try {
        await getUser();
        await getLabel();
        await getMilestone();
      } catch (e) {
        console.log(e);
      }
    };
    fn();
  }, []);


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

export default connect(
  ({ user, label, milestone, loading }) => ({
    users: user.users,
    labels: label.labels,
    milestones: milestone.milestones,
    loadingUser: loading["user/GET_USER"],
    loadingLabel: loading["label/GET_LABEL"],
    loadingMilestone: loading["milestone/GET_MILESTONE"],
  }),
  {
    getUser,
    getLabel,
    getMilestone,
  }
)(FilterVerticalList);
