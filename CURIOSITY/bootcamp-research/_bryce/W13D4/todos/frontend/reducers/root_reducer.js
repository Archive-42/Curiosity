import {combineReducers} from 'redux';
import todosReducer from './todos_reducer';
import errorReducer from './error_reducer'

const rootReducer = combineReducers({
  todos: todosReducer,
  errors: errorReducer
});

export default rootReducer;