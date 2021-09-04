
import {
  ADD_ONE,
  SUBTRACT_ONE,
  MULTIPLY_BY_TWO,
  DIVIDE_BY_TWO,
  RESET_CALCULATOR,
} from './actions';

const calculatorReducer = (state = 0, action) => {
  switch (action.type) {
    case ADD_ONE:
      return state + 1;
    case SUBTRACT_ONE:
      return state - 1;
    case MULTIPLY_BY_TWO:
      return state * 2;
    case DIVIDE_BY_TWO:
      return state / 2;
    case RESET_CALCULATOR:
      return action.number;
    default:
      return state;
  }
};

export default calculatorReducer;
