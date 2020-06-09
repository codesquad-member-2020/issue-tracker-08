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

const Header = styled.header``;

const HeaderIcon = styled(SubjectIcon)``;

const NavBarWrap = styled.nav``;

const NavBar = styled.nav``;

const SearchBarWrapper = styled.div``;

const SearchBar = styled.form``;

const SearchInput = styled.input``;

const SearchInputIcon = styled(SearchIcon)``;

const IssueListWrapper = styled.div``;

const IssueList = styled.div``;

const IssueHeader = styled.div``;

export default IssueListPage;
