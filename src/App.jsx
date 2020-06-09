import React from "react";
import { ThemeProvider } from "styled-components";

import IssueListPage from "@IssueListPage/IssueListPage";
import GlobalStyle from "@Style/GlobalStyle";
import theme from "@Style/theme";

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <IssueListPage />
      </ThemeProvider>
    </>
  );
};

export default App;
