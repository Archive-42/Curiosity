import { combineReducers } from 'redux';
import errorsReducer from './error_reducer';
import loadingReducer from './loading_reducer';

const uiReducer = combineReducers({
  errors: errorsReducer
})

export default uiReducer;