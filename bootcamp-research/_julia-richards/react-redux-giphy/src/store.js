// TODO: Import `createStore` from `redux`
import { createStore, applyMiddleware, compose } from 'redux';

// TODO: Import middleware
import thunk from 'redux-thunk';
import logger from 'redux-logger';



// TODO: Import `rootReducer`
import rootReducer from './reducers/rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// TODO: Define a `configureStore` function
const configureStore = () => {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, logger)),
  );
};

export default configureStore;
