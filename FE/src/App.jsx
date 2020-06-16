import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "@Style/GlobalStyle";
import theme from "@Style/theme";

import LoginPage from "@LoginPage/LoginPage";
import IssueListPage from "@IssueListPage/IssueListPage";
import CreateIssuePage from "@CreateIssuePage/CreateIssuePage";
import IssueDetailPage from "@IssueDetailPage/IssueDetailPage";
import LabelListPage from "@LabelListPage/LabelListPage";
import MilestonePage from "@MilestonePage/MilestonePage";
import CreateMilestonePage from "@CreateMilestonePage/CreateMilestonePage";
import ErrorPage from "@ErrorPage/ErrorPage";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as getIssue from "@/modules/issue";

const App = () => {
  const PostActions = getIssue;
  const getPost2 = async () => {
    try {
      await PostActions.getPost();
      console.log("요청이 완료 된 다음에 실행됨");
    } catch (e) {
      console.log("에러가 발생!");
      console.error(e);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <button onClick={PostActions.getIssue()}>hi</button>
        <Router>
          <Switch>
            <Route path="/" exact component={LoginPage} />
            <Route path="/IssueListPage" exact component={IssueListPage} />
            <Route path="/CreateIssuePage" exact component={CreateIssuePage} />
            <Route path="/IssueDetailPage" exact component={IssueDetailPage} />
            <Route path="/LabelListPage" exact component={LabelListPage} />
            <Route path="/MilestonePage" exact component={MilestonePage} />
            <Route path="/CreateMilestonePage/:state" component={CreateMilestonePage} />
            <Route component={ErrorPage} />
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
};

// export default App;

export default connect(
  (state) => ({
    issue: state.issue.data,
    loading: state.issue.pending,
    error: state.issue.error,
  }),
  (dispatch) => ({
    PostActions: bindActionCreators(getIssue, dispatch),
  })
)(App);
