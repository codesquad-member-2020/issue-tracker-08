import React from "react";
import styled from "styled-components";
import SubjectIcon from "@material-ui/icons/Subject";
import { useHistory } from "react-router-dom";

import Text from "@Style/Text";
import getCookieValue from "@Lib/getCookieValue";

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
        <UserWrapper>
          <Text color="white">{getCookieValue("nickname")}</Text>
          <UserImage src={decodeURIComponent(getCookieValue("avatarUrl"))} />
          <Text color="white" isClick onClick={logoutHandler}>
            로그아웃
          </Text>
        </UserWrapper>
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
  position: relative;
`;

const HeaderIcon = styled(SubjectIcon)`
  color: ${({ theme }) => theme.colors.gray2};
  margin-right: 5px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UserWrapper = styled.div`
  position: absolute;
  right: 40px;
  display: flex;
  align-items: center;
  height: 40px;
  line-height: 20px;
  border-radius: 15px;
  padding: 0 3px;
  margin-left: 3px;
  font-size: 13px;
  font-weight: bold;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.18);
`;

const UserImage = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 5px;
  margin: 0 15px 0 10px;
`;

export default Header;
