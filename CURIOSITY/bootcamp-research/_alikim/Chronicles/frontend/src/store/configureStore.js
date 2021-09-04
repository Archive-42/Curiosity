import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import charactersReducer from './mainReducers/charactersReducer'
import assetsReducer from './mainReducers/assetsReducer'
import choicesReducer from './mainReducers/choicesReducer'
import chroniclesReducer from './mainReducers/chroniclesReducer'
import statusesReducer from './mainReducers/statusesReducer'
import placesReducer from './mainReducers/placesReducer'
import metersReducer from './mainReducers/metersReducer'
import selectionsReducer from './mainReducers/selectionsReducer'
import talesReducer from './mainReducers/talesReducer'
import threadsReducer from './mainReducers/threadsReducer'
import locksReducer from './mainReducers/locksReducer'
import effectsReducer from './mainReducers/effectsReducer'
import errorsReducer from './mainReducers/errorsReducer'
import userReducer from './mainReducers/userReducer'
import genRootReducer from './genReducers/configureStore'
import entitiesReducer from './mainReducers/entitiesReducer'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  assets: assetsReducer,
  choices: choicesReducer,
  chronicles: chroniclesReducer,
  statuses: statusesReducer,
  effects: effectsReducer,
  entities: entitiesReducer,
  errors: errorsReducer,
  meters: metersReducer,
  selections: selectionsReducer,
  tales: talesReducer,
  threads: threadsReducer,
  locks: locksReducer,
  user: userReducer,
  charGen: genRootReducer,
})

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    // composeEnhancers(),
    composeWithDevTools(applyMiddleware(logger))
  )
}