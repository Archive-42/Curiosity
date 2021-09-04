import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import user from '../store/reducers/user';
import reviews from '../store/reducers/reviews';
import favorites from '../store/reducers/favorites';
import products from '../store/reducers/products';
import categories from '../store/reducers/categories';
import ui from '../store/reducers/ui';
import cart from '../store/reducers/cart';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    user,
    reviews,
    favorites,
    products,
    categories,
    ui,
    cart
});

export const configureStore = initialState => {
    return createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk))
    );
}
