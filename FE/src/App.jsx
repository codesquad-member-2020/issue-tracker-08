import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "@Style/GlobalStyle";
import theme from "@Style/theme";

const LoginPage = lazy(() => import("@LoginPage/LoginPage"));
const IssueListPage = lazy(() => import("@IssueListPage/IssueListPage"));
const CreateIssuePage = lazy(() => import("@CreateIssuePage/CreateIssuePage"));
const IssueDetailPage = lazy(() => import("@IssueDetailPage/IssueDetailPage"));
const LabelListPage = lazy(() => import("@LabelListPage/LabelListPage"));
const MilestonePage = lazy(() => import("@MilestonePage/MilestonePage"));
const CreateMilestonePage = lazy(() => import("@CreateMilestonePage/CreateMilestonePage"));
const ErrorPage = lazy(() => import("@ErrorPage/ErrorPage"));

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/" exact component={LoginPage} />
              <Route path="/IssueListPage" exact component={IssueListPage} />
              <Route path="/CreateIssuePage" exact component={CreateIssuePage} />
              <Route path="/IssueDetailPage/:issueId" exact component={IssueDetailPage} />
              <Route path="/LabelListPage" exact component={LabelListPage} />
              <Route path="/MilestonePage" exact component={MilestonePage} />
              <Route path="/CreateMilestonePage/" exact component={CreateMilestonePage} />
              <Route path="/CreateMilestonePage/:milestoneId" component={CreateMilestonePage} />
              <Route component={ErrorPage} />
            </Switch>
          </Suspense>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
