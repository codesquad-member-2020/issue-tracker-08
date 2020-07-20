import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

import FilterButton from "@FilterButton/FilterButton";
import { getUser } from "@Modules/user";
import { getLabel } from "@Modules/label";
import { getMilestone } from "@Modules/milestone";

const FilterVerticalList = ({ users, labels, milestones, getUser, getLabel, getMilestone, loadingUser, loadingLabel, loadingMilestone }) => {
  const optionData = useSelector(({ issue: { detailIssue } }) => {
    return {
      assignees: detailIssue.assignees,
      labels: detailIssue.labels,
      milestone: detailIssue.milestone,
    };
  });

  const assigneeList = () => {
    return [...users].map((user) => {
      return { id: user.id.userId, name: user.nickname, color: "#fff", img: user.avatar_url, description: "" };
    });
  };

  const makeAssignee = () => {
    if (!optionData.assignees) return;
    return [...optionData.assignees].map((user) => {
      return { id: user.id, name: user.nickname, color: "#fff", img: user.avatarUrl, description: "" };
    });
  };

  const milestoneList = () => {
    return [...milestones.milestones].map((milestone) => {
      return { id: milestone.id, name: milestone.title, color: "#fff", description: milestone.description };
    });
  };

  const makeMilestone = () => {
    if (!optionData.milestone) return;
    return [{ id: optionData.milestone.id, name: optionData.milestone.title, color: "#fff", description: optionData.milestone.description }];
  };

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

  const hasData = () => {
    return !loadingUser && users && !loadingLabel && labels && !loadingMilestone && milestones;
  };

  return (
    <>
      {hasData() && (
        <>
          <Wrapper>
            <FilterButton title="Assignees" data={assigneeList()} initialData={optionData && makeAssignee()}></FilterButton>
            <FilterButton title="Labels" data={labels} initialData={optionData && optionData.labels}></FilterButton>
            <FilterButton title="Milestone" data={milestoneList()} initialData={optionData && makeMilestone()}></FilterButton>
          </Wrapper>
        </>
      )}
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
