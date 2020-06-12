import React from "react";
import styled from "styled-components";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

import Text from "@Style/Text";

const Milestone = ({ title, date, description }) => {
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
        <ProgressWrapper></ProgressWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
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

const ProgressWrapper = styled.div``;

export default Milestone;
