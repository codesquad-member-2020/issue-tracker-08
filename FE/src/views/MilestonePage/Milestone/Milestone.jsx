import React from "react";
import styled from "styled-components";
import CalendarTodayOutlinedIcon from "@material-ui/icons/CalendarTodayOutlined";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import TimeAgo from "react-timeago";
import { useHistory } from "react-router-dom";
import Text from "@Style/Text";
import { configureDate } from "@Lib/configureDate";

const Milestone = ({ milestone, patchHandler, deleteHandler }) => {
  let history = useHistory();

  const onPassCreateMilestonePage = () => history.push(`/CreateMilestonePage/${milestone.id}`);

  const onPatch = () => {
    patchHandler(milestone.id);
  };
  const onDelete = () => {
    deleteHandler(milestone.id);
  };

  return (
    <>
      <Wrapper>
        <TitleWrapper>
          <Text fontSize="xl" isClick as="a">
            {milestone.title}
          </Text>
          <DueDateWrapper>
            {milestone.dueDate ? (
              <>
                <CalendarTodayOutlinedIcon fontSize="small" style={{ marginRight: "5px" }} /> {"Due by "}
                {configureDate(milestone.dueDate, "short", "Milestone")}
              </>
            ) : milestone.isOpen ? (
              <Text color="gray4">No due date</Text>
            ) : (
              <>
                <Text color="gray4" fontWeight="bold">
                  Closed
                </Text>
                <TimeAgo date={milestone.updatedAt} style={{ marginLeft: "5px" }} />
              </>
            )}
            <>
              <AccessTimeIcon fontSize="small" style={{ margin: "0 5px 0 10px" }} /> Last updated
              <TimeAgo date={milestone.updatedAt} style={{ marginLeft: "5px" }} />
            </>
          </DueDateWrapper>
          <Text color="gray3">{milestone.description}</Text>
        </TitleWrapper>
        <ProgressWrapper>
          <ProgressBar>
            <Progress achievementRate={milestone.achievementRate ? milestone.numberOfClosedIssue : 0}></Progress>
          </ProgressBar>
          <StatusBar>
            <Text fontSize="sm" fontWeight="semiBold">
              <Text>{milestone.achievementRate ? milestone.achievementRate : "0"}%</Text> complete
            </Text>
            <Text fontSize="sm" fontWeight="semiBold">
              <Text>{milestone.numberOfOpenIssue ? milestone.numberOfOpenIssue : "0"}</Text> open
            </Text>
            <Text fontSize="sm" fontWeight="semiBold">
              <Text>{milestone.numberOfClosedIssue ? milestone.numberOfClosedIssue : "0"}</Text> closed
            </Text>
          </StatusBar>
          <AdminWrapper>
            <Text color="blue" fontSize="sm" isClick onClick={onPassCreateMilestonePage}>
              Edit
            </Text>
            <Text color="blue" fontSize="sm" isClick onClick={onPatch}>
              {milestone.isOpen ? "Close" : "Open"}
            </Text>
            <Text color="red" fontSize="sm" isClick onClick={onDelete}>
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

const DueDateWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  color: ${({ theme }) => theme.colors.gray4};
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
