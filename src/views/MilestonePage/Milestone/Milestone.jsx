import React from "react";
import styled from "styled-components";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { useHistory } from "react-router-dom";

import Text from "@Style/Text";

const Milestone = ({ title, date, description, history }) => {
  let history = useHistory();
  return (
    <>
      <Wrapper>
        <TitleWrapper>
          <Text fontSize="xl" as="a">
            {title}
          </Text>
          <DueDateWrapper color="gray4">
            <CalendarTodayIcon fontSize="small" /> Due by {date}
          </DueDateWrapper>
          <Text color="gray3">{description}</Text>
        </TitleWrapper>
        <ProgressWrapper>
          <ProgressBar>
            <Progress></Progress>
          </ProgressBar>
          <StatusBar>
            <Text fontSize="sm" fontWeight="semiBold">
              <Text>90%</Text> complete
            </Text>
            <Text fontSize="sm" fontWeight="semiBold">
              <Text>3</Text> open
            </Text>
            <Text fontSize="sm" fontWeight="semiBold">
              <Text>28</Text> closed
            </Text>
          </StatusBar>
          <AdminWrapper>
            <Text color="blue" fontSize="sm" onClick={() => history.push(`/CreateMilestonePage/isEdit`)}>
              Edit
            </Text>
            <Text color="blue" fontSize="sm">
              Close
            </Text>
            <Text color="red" fontSize="sm">
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
  width: 50%;
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
