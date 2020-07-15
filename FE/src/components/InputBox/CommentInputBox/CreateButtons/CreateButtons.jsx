import React from "react";

import Button from "@Style/Button";

const CreateButtons = ({ isIssue, titleContent, rawContent, submiClicktHandler, editClickHandler, cancelClickHandler }) => {
  return (
    <>
      <Button backgroundColor="white" color="black" borderColor="white" onClick={cancelClickHandler}>
        Cancel
      </Button>
      <Button disabled={isIssue ? !titleContent : !rawContent} onClick={isIssue ? submiClicktHandler : editClickHandler}>
        {isIssue ? "Submit new issue" : "Update comment"}
      </Button>
    </>
  );
};

export default CreateButtons;
