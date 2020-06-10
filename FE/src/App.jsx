import React from "react";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "@Style/GlobalStyle";
import theme from "@Style/theme";

import LoginPage from "@LoginPage/LoginPage";
import IssueListPage from "@IssueListPage/IssueListPage";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {/* <IssueListPage /> */}
        <LoginPage />
      </ThemeProvider>
    </>
  );
};

export default App;
