import React from "react";
import styled from "styled-components";

import Text from "@Style/Text";

const LabelListHeader = ({ count }) => {
  return (
    <>
      <Text fontWeight="bold">{count} labels</Text>
    </>
  );
};

export default LabelListHeader;
