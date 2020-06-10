import React from "react";
import styled from "styled-components";
import SubjectIcon from "@material-ui/icons/Subject";
import SearchIcon from "@material-ui/icons/Search";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import NavigationButton from "@NavigationButton/NavigationButton";
import Issue from "@IssueListPage/Issue/Issue";
import Text from "@Style/Text";
import Button from "@Style/Button";

const IssueListPage = () => {
  return (
    <>
      <Header>
        <HeaderIcon />
        <Text color="white" fontWeight="bold" as="h2">
          ISSUES
        </Text>
      </Header>
      <NavBarWrap>
        <NavBar>
          <SearchBarWrapper>
            <Button backgroudColor="frenchGray" color="black">
              Filters
              <ArrowDropDownIcon />
            </Button>
            <SearchBar>
              <SearchInput placeholder="Search all issues" />
              <SearchInputIcon />
            </SearchBar>
          </SearchBarWrapper>
          <NavigationButton />
          <Button>New Issue</Button>
        </NavBar>
      </NavBarWrap>
      <IssueListWrapper>
        <IssueList>
          <IssueHeader></IssueHeader>
          <Issue></Issue>
          <Issue></Issue>
        </IssueList>
      </IssueListWrapper>
    </>
  );
};

const Header = styled.header`
  width: 100%;
  height: 80px;
  background-color: ${({ theme }) => theme.colors.black};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

const HeaderIcon = styled(SubjectIcon)`
  color: ${({ theme }) => theme.colors.lightGray};
  margin-right: 5px;
`;

const NavBarWrap = styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const NavBar = styled.nav`
  width: 65%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 55%;
`;

const SearchBar = styled.form`
  position: relative;
  height: 100%;
  width: 100%;
`;

const SearchInput = styled.input`
  padding-left: 30px;
  background-color: ${({ theme }) => theme.colors.frenchGray};
  color: ${({ theme }) => theme.colors.gray};
  border-radius: 5px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  outline: none;
  height: inherit;
  width: inherit;
`;

const SearchInputIcon = styled(SearchIcon)`
  position: absolute;
  top: 9px;
  left: 8px;
  display: block;
  color: ${({ theme }) => theme.colors.lightGray};
  text-align: center;
  pointer-events: none;
`;

const IssueListWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
`;

const IssueList = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 5px;
  width: 65%;
`;

const IssueHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.frenchGray};
  height: 50px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

export default IssueListPage;
