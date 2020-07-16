import React from "react";
import styled from "styled-components";

import Button from "@Style/Button";

const CreateMilestoneButtons = ({ milestoneId, titleContent, onPassMilestonePage, onSaveMilestone, onCreateMilestone }) => {
  return (
    <>
      <Wrapper>
        {milestoneId ? (
          <>
            <Button backgroundColor="gray1" color="black" onClick={onPassMilestonePage}>
              Cancel
            </Button>
            <Button backgroundColor="gray1" color="black" onClick={onPassMilestonePage}>
              Close milestone
            </Button>
            <Button onClick={onSaveMilestone} disabled={!titleContent}>
              Save changes
            </Button>
          </>
        ) : (
          <Button onClick={onCreateMilestone} disabled={!titleContent}>
            Create milestone
          </Button>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
`;

export default CreateMilestoneButtons;
