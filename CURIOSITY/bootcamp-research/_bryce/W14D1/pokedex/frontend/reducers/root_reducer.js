import entitiesReducer from './entities_reducer'
import uiReducer from './ui_reducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  entities: entitiesReducer,
  ui: uiReducer
});


export default rootReducer;