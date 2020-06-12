import React from "react";
import styled from "styled-components";
import SubjectIcon from "@material-ui/icons/Subject";

import Text from "@Style/Text";

const Header = (props) => {
  return (
    <>
      <Wrapper>
        <HeaderIcon />
        <Text color="white" fontWeight="bold" as="h2" onClick={() => props.history.push(`/IssueListPage`)}>
          ISSUES
        </Text>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.header`
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.black};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

const HeaderIcon = styled(SubjectIcon)`
  color: ${({ theme }) => theme.colors.gray2};
  margin-right: 5px;
`;

export default Header;
