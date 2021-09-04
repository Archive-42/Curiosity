import { createElement as h } from "react";
import { render } from "react-dom";
import { bindActionCreators } from "redux";
import { Provider, connect } from "react-redux";

import isDemo from "../../utils/isDemo";

import createStore from "./utils/createStore";
import enhanceState from "./utils/enhanceState";
import * as storage from "./utils/storage";
import reducers from "./reducers";
import * as actions from "./actions";

import { initialState as initialTokenState } from "./reducers/token";
import { initialState as initialRouteState } from "./reducers/route";
import { initialState as initialViewsState } from "./reducers/views";
import { initialState as initialReferrersState } from "./reducers/referrers";

import Main from "./components/Main";

const persistedState = storage.load();
const store = createStore(reducers, persistedState);

const mapStateToProps = (state) => enhanceState(state);
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

const ConnectedMain = connect(mapStateToProps, mapDispatchToProps)(Main);
const container = document.querySelector("#main");

if (isDemo === true) {
  console.warn("Ackee runs in demo mode");
}

store.subscribe(() => {
  const currentState = store.getState();

  storage.save({
    token: {
      ...initialTokenState(),
      value: currentState.token.value,
    },
    route: {
      ...initialRouteState(),
      value: currentState.route.value,
    },
    views: {
      ...initialViewsState(),
      type: currentState.views.type,
    },
    referrers: {
      ...initialReferrersState(),
      sorting: currentState.referrers.sorting,
    },
  });
});

const App = h(Provider, { store }, h(ConnectedMain));

render(App, container);
