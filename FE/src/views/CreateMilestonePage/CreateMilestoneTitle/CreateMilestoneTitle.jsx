import React from "react";
import styled from "styled-components";

import Text from "@Style/Text";

import NavigationButton from "@NavigationButton/NavigationButton";

const CreateMilestoneTitle = ({ milestoneId }) => {
  return (
    <>
      <Wrapper>
        {milestoneId ? (
          <NavigationButton isMilestone />
        ) : (
          <>
            <Text fontSize="xl" fontWeight="bold">
              New milestone
            </Text>
            <Text>Create a new milestone to help organize your issues.</Text>
          </>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
  flex-direction: column;
  padding: 20px 0;
  align-items: end;
`;

export default CreateMilestoneTitle;
