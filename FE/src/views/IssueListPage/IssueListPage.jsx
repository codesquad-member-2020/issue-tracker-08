import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "@Style/Button";

import Issue from "@IssueListPage/Issue/Issue";
import IssueListHeader from "@IssueListPage/IssueListHeader/IssueListHeader";
import NavigationButton from "@NavigationButton/NavigationButton";
import FilterButton from "@FilterButton/FilterButton";
import Header from "@Header/Header";
import Table from "@Table/Table";
import { getIssue } from "@Modules/issue";

const IssueListPage = ({ getIssue, issues, loadingIssue }) => {
  let history = useHistory();

  const [checkedItems, setCheckedItems] = useState([]);

  const checkedItemHandler = (id, isChecked) => {
    if (isChecked && checkedItems.includes(id)) return;
    if (!isChecked && checkedItems.includes(id)) setCheckedItems([...checkedItems].filter((x) => x !== id));
    else setCheckedItems([...checkedItems, id]);
  };

  const onPassCreateIssuePage = () => history.push(`/CreateIssuePage`);

  const IssueList = () => (
    <>{!loadingIssue && issues && issues.map((issue) => <Issue key={issue.id} issue={issue} checkedItemHandler={checkedItemHandler}></Issue>)}</>
  );

  useEffect(() => {
    const fn = async () => {
      try {
        await getIssue();
      } catch (e) {
        console.log(e);
      }
    };
    fn();
  }, [getIssue]);

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
          <Button onClick={onPassCreateIssuePage}>New Issue</Button>
        </NavBar>
      </NavBarWrap>
      <Table tableHeader={<IssueListHeader />} tableList={<IssueList />} />
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
  max-width: 1000px;
  min-width: 760px;
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
  &:focus {
    outline: none;
    background-color: white;
    border-color: ${({ theme }) => theme.colors.blue};
    box-shadow: inset 0 1px 2px ${({ theme }) => theme.colors.babyblue}, 0 0 0 0.2em ${({ theme }) => theme.colors.skyblue};
  }
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

export default connect(
  ({ issue, loading }) => ({
    issues: issue.issues,
    loadingIssue: loading["issue/GET_ISSUE"],
  }),
  {
    getIssue,
  }
)(IssueListPage);

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
