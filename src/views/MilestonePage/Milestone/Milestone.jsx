import React from "react";
import styled from "styled-components";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { useHistory } from "react-router-dom";

import Text from "@Style/Text";
import { configureDate } from "@Lib/configureDate";
import { patchMilestone, deleteMilestone } from "@Modules/milestone";

const Milestone = ({ milestone }) => {
  let history = useHistory();

  const onPassCreateMilestonePage = () => history.push(`/CreateMilestonePage/${milestone.id}`);

  const deleteConfirm = () => {
    return confirm("Are you sure?");
  };

  const patchHandler = () => {
    const fn = async () => {
      try {
        await patchMilestone(milestone.id);
      } catch (e) {
        console.log(e);
      }
    };
    fn();
  };

  const deleteHandler = () => {
    if (!deleteConfirm()) return;
    const fn = async () => {
      try {
        await deleteMilestone(milestone.id);
      } catch (e) {
        console.log(e);
      }
    };
    fn();
  };

  return (
    <>
      <Wrapper>
        <TitleWrapper>
          <Text fontSize="xl" isClick as="a">
            {milestone.title}
          </Text>
          <DueDateWrapper color="gray4">
            <CalendarTodayIcon fontSize="small" /> Due by {configureDate(milestone.dueDate, "short", "Milestone")}
          </DueDateWrapper>
          <Text color="gray3">{milestone.description}</Text>
        </TitleWrapper>
        <ProgressWrapper>
          <ProgressBar>
            <Progress achievementRate={milestone.achievementRate}></Progress>
          </ProgressBar>
          <StatusBar>
            <Text fontSize="sm" fontWeight="semiBold">
              <Text>{milestone.achievementRate}%</Text> complete
            </Text>
            <Text fontSize="sm" fontWeight="semiBold">
              <Text>{milestone.numberOfOpenIssue}</Text> open
            </Text>
            <Text fontSize="sm" fontWeight="semiBold">
              <Text>{milestone.numberOfClosedIssue}</Text> closed
            </Text>
          </StatusBar>
          <AdminWrapper>
            <Text color="blue" fontSize="sm" isClick onClick={onPassCreateMilestonePage}>
              Edit
            </Text>
            <Text color="blue" fontSize="sm" isClick onClick={patchHandler}>
              {milestone.isOpen ? "Close" : "Open"}
            </Text>
            <Text color="red" fontSize="sm" isClick onClick={deleteHandler}>
              Delete
            </Text>
          </AdminWrapper>
        </ProgressWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  width: 500px;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
`;

const DueDateWrapper = styled(Text)`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const ProgressWrapper = styled.div`
  min-height: inherit;
  width: 400px;
  padding: 15px 20px;
`;

const ProgressBar = styled.div`
  margin-top: 7px;
  margin-bottom: 12px;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.gray3};
  border-radius: 3px;
`;

const Progress = styled.div`
  width: ${(props) => props.achievementRate}%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.green};
  border-radius: 3px;
`;

const StatusBar = styled.div`
  ${Text} + ${Text} {
    margin-left: 15px;
  }
`;

const AdminWrapper = styled.div`
  margin-top: 8px;
  ${Text} + ${Text} {
    margin-left: 15px;
  }
`;

export default Milestone;
