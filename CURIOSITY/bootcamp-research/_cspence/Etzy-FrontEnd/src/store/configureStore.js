import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import authentication from './reducers/authentication';
import product from './reducers/product';
import productlist from './reducers/productlist';
import cart from './reducers/cart';
import shop from './reducers/shop';
import favorite from './reducers/favorite';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  authentication,
  product,
  productlist,
  cart,
  shop,
  favorite
});

const configureStore = initialState => {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
};

export default configureStore;