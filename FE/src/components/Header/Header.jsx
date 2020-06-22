import React from "react";
import styled from "styled-components";
import SubjectIcon from "@material-ui/icons/Subject";
import { useHistory } from "react-router-dom";

import Text from "@Style/Text";

const Header = () => {
  let history = useHistory();
  if (!document.cookie) history.push("/");

  const onPass = () => history.push(`/IssueListPage`);

  const logoutHandler = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    document.cookie += ";Expires=" + date.toUTCString();
    history.push("/");
  };

  return (
    <>
      <Wrapper>
        <TitleWrapper>
          <HeaderIcon />
          <Text color="white" fontWeight="bold" isClick as="h2" onClick={onPass}>
            ISSUES
          </Text>
        </TitleWrapper>
          <Text color="white" isClick onClick={logoutHandler}>
            로그아웃
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

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default Header;
