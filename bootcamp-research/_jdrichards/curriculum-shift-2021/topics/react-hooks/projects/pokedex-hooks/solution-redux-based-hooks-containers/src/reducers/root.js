import { combineReducers } from 'redux';
import authentication from './authentication';
import pokemon from './pokemon';

const rootReducer = combineReducers({
  authentication,
  pokemon,
});

export default rootReducer;
