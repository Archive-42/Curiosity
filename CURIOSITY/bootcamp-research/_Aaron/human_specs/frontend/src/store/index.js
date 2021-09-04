// frontend/src/store/index.js
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

//Stores
import session from "./reducers/session";
import stats from "./reducers/stats";

// const enhancer;
let enhancer;
if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const rootReducer = combineReducers({
  session,
  stats,
});

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
