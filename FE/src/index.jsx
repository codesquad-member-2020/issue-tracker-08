import ReactDOM from "react-dom";
import React from "react";
import ReduxThunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import App from "@/App";
import modules from "@/modules";

const rootElement = document.getElementById("root");
const middleware = applyMiddleware(ReduxThunk);

const store = createStore(modules, composeWithDevTools(middleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
