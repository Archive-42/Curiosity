
export const ADD_ONE = 'ADD_ONE';
export const SUBTRACT_ONE = 'SUBTRACT_ONE';
export const MULTIPLY_BY_TWO = 'MULTIPLY_BY_TWO';
export const DIVIDE_BY_TWO = 'DIVIDE_BY_TWO';
export const RESET_CALCULATOR = 'RESET_CALCULATOR';

export const addOne = () => ({
  type: ADD_ONE,
});

export const subtractOne = () => ({
  type: SUBTRACT_ONE,
});

export const multiplyByTwo = () => ({
  type: MULTIPLY_BY_TWO,
});

export const divideByTwo = () => ({
  type: DIVIDE_BY_TWO,
});

export const resetCalculator = () => ({
  type: RESET_CALCULATOR,
  number: 0,
});
