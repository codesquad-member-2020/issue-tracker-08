import React from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";

import Button from "@Style/Button";

import Issue from "@IssueListPage/Issue/Issue";
import NavigationButton from "@NavigationButton/NavigationButton";
import FilterButton from "@FilterButton/FilterButton";
import Header from "@Header/Header";

const IssueListPage = (props) => {
  return (
    <>
      <Header />
      <NavBarWrap>
        <NavBar>
          <SearchBarWrapper>
            <SearchBarFilterButton>
              <FilterButton filter={true} title="Filters" data={labels}></FilterButton>
            </SearchBarFilterButton>
            <SearchBar>
              <SearchInput placeholder="Search all issues" />
              <SearchInputIcon />
            </SearchBar>
          </SearchBarWrapper>
          <NavigationButton />
          <Button onClick={() => props.history.push(`/CreateIssuePage`)}>New Issue</Button>
        </NavBar>
      </NavBarWrap>
      <IssueListWrapper>
        <IssueList>
          <IssueHeader>
            <Checkbox />
            <FilterButtonWrapper>
              <FilterButton filter title="Author" data={labels}></FilterButton>
              <FilterButton filter title="Label" data={labels}></FilterButton>
              <FilterButton filter title="Milestones" data={labels}></FilterButton>
              <FilterButton filter title="Assignee" data={labels}></FilterButton>
            </FilterButtonWrapper>
          </IssueHeader>
          <Issue></Issue>
          <Issue></Issue>
        </IssueList>
      </IssueListWrapper>
    </>
  );
};

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

const SearchBarFilterButton = styled.div`
  background-color: ${({ theme }) => theme.colors.gray1};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  text-align: center;
  padding: 10px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const SearchBar = styled.form`
  position: relative;
  height: 100%;
  width: 100%;
`;

const SearchInput = styled.input`
  padding-left: 30px;
  background-color: ${({ theme }) => theme.colors.gray1};
  color: ${({ theme }) => theme.colors.gray4};
  border-radius: 5px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  outline: none;
  height: inherit;
  width: inherit;
`;

const SearchInputIcon = styled(SearchIcon)`
  position: absolute;
  top: 9px;
  left: 8px;
  display: block;
  color: ${({ theme }) => theme.colors.gray2};
  text-align: center;
  pointer-events: none;
`;

const IssueListWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
`;

const IssueList = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 5px;
  width: 65%;
`;

const IssueHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.gray1};
  height: 50px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })``;

const FilterButtonWrapper = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
`;

export default IssueListPage;

const labels = [
  {
    name: "good first issue",
    color: "#7057ff",
    description: "Good for newcomers",
  },
  {
    name: "help wanted",
    color: "#008672",
    description: "Extra attention is needed",
  },
  {
    name: "priority: critical",
    color: "#b60205",
    description: "",
  },
  {
    name: "priority: critical",
    color: "#b60205",
    description: "",
  },
  {
    name: "priority: critical",
    color: "#b60205",
    description: "",
  },
];
