import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers/rootReducer';
import {ingredients, potions, npcs, ailments} from '../data/data'
import { normalizeData } from '../utility/utility'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initial = {
    npcs: normalizeData(npcs),
    potions: normalizeData(potions),
    ingredients: normalizeData(ingredients),
    ailments: normalizeData(ailments),
}
console.log("initial", initial)

const configureStore = (initialState=initial) => {
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunk, logger))
    )
}

export default configureStore;