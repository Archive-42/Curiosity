// TODO: Import `createStore` from `redux`
import { createStore, applyMiddleware } from 'redux';
// TODO: Import middleware
// TODO: Import `rootReducer`
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';

// TODO: Define a `configureStore` function
const configureStore = () => createStore(rootReducer, applyMiddleware(thunk, logger));

// TODO: Export the `configureStore` function
export default configureStore;
