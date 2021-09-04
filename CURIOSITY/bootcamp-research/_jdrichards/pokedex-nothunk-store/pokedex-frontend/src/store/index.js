import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import pokemon from './pokemon';
import items from './items';

const rootReducer = combineReducers({
  pokemon,
  items
});

let enhancer;

if (process.env.NODE_ENV !== 'production') {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
