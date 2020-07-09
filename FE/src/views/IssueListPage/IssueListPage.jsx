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

  const [checkedItems, setCheckedItems] = useState(new Set());

  const isGetIssues = () => !loadingIssue && issues;

  const checkedItemHandler = (id, isChecked) => {
    if (isChecked) setCheckedItems(checkedItems.add(id));
    else if (!isChecked && checkedItems.has(id)) checkedItems.delete(id);
  };

  const onPassCreateIssuePage = () => history.push(`/CreateIssuePage`);

  const IssueList = () => (
    <>{!loadingIssue && issues && issues.map((issue) => <Issue key={issue.id} issue={issue} checkedItemHandler={checkedItemHandler}></Issue>)}</>
  );
  // 개발용 목데이터 불러오는 코드
  // const IssueList = () => (
  //   <>
  //     {mockOfIssues.map((issue) => (
  //       <Issue key={issue.id} issue={issue} checkedItemHandler={checkedItemHandler}></Issue>
  //     ))}
  //   </>
  // );

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

const mockOfIssues = [
  {
    id: 1,
    title: "이슈 보여라",
    content: "성공",
    isOpen: true,
    createdAt: "2020-07-06 21:42:55",
    numberOfComment: 0,
    author: {
      id: 1,
      nickname: "jay",
      avatarUrl: "https://codesquad-project.s3.ap-northeast-2.amazonaws.com/sad.jpg",
    },
    milestone: {
      id: 1,
      title: "BE 1주차",
      description: "issue 목록",
      dueDate: "2020-07-10",
      updatedAt: "2020-07-06 21:42:30",
      isOpen: true,
    },
    assignees: [
      {
        id: 1,
        nickname: "jay",
        avatarUrl: "https://codesquad-project.s3.ap-northeast-2.amazonaws.com/sad.jpg",
      },
    ],
    labels: [
      {
        id: 1,
        name: "FE",
        description: "프론트용 라벨",
        color: "#7be0d4",
        isFontColorBlack: false,
      },
    ],
    comments: null,
  },
  {
    id: 2,
    title: "테스트",
    content: "성공",
    isOpen: true,
    createdAt: "2020-07-07 15:42:55",
    numberOfComment: 0,
    author: {
      id: 1,
      nickname: "jay",
      avatarUrl: "https://codesquad-project.s3.ap-northeast-2.amazonaws.com/sad.jpg",
    },
    milestone: {
      id: 1,
      title: "BE 1주차",
      description: "issue 목록",
      dueDate: "2020-07-10",
      updatedAt: "2020-07-06 21:42:30",
      isOpen: true,
    },
    assignees: [
      {
        id: 1,
        nickname: "jay",
        avatarUrl: "https://codesquad-project.s3.ap-northeast-2.amazonaws.com/sad.jpg",
      },
    ],
    labels: [
      {
        id: 1,
        name: "FE",
        description: "프론트용 라벨",
        color: "#7be0d4",
        isFontColorBlack: false,
      },
    ],
    comments: null,
  },
];
