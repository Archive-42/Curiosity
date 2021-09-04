import { createStore } from 'redux'
import calculatorReducer from './reducer';

const store = createStore(calculatorReducer);

export default store;
