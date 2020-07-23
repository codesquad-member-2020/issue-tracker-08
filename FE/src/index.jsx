import ReactDOM from "react-dom";
import React, { Suspense, lazy } from "react";
import ReduxThunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import modules from "@/modules";

const App = lazy(() => import("@/App"));
const rootElement = document.getElementById("root");
const middleware = applyMiddleware(ReduxThunk);

const store = createStore(modules, composeWithDevTools(middleware));

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </Provider>,
  rootElement
);
