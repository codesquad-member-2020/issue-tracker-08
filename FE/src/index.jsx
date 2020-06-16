import ReactDOM from "react-dom";
import React from "react";
import ReduxThunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";

import App from "@/App";
import modules from "@/modules";

const rootElement = document.getElementById("root");
const store = createStore(modules, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
