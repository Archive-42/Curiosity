import { createStore, combineReducers, compose } from 'redux';

import session from './session';
import users from './users';

const rootReducer = combineReducers({
  session,
  users
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers();

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
