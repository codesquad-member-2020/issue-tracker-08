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

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Switch>
            <Route path="/" exact component={LoginPage} />
            <Route path="/IssueListPage" exact component={IssueListPage} />
            <Route path="/CreateIssuePage" exact component={CreateIssuePage} />
            <Route path="/IssueDetailPage/:issueId" exact component={IssueDetailPage} />
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

export default App;
