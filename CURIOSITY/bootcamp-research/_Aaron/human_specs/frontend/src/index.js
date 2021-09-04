// Dependencies
import React from "react";

import "./css/index.css";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";

//Redux Store
import configureStore from "./store";
import { restoreCSRF, fetch } from "./store/csrf";
import * as sessionActions from "./store/actions/session";
import * as statActions from "./store/actions/stats";

//Set initial state
const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = fetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.statActions = statActions;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
