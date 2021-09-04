import React from 'react';

const Calculator = ({
    result,
    add,
    subtract,
    multiply,
    divide,
    clear,
  }) => (
    <div>
      <h1>Result: {result}</h1>
      <br />
      <button onClick={add}>+</button>
      <button onClick={subtract}>-</button>
      <button onClick={multiply}>*</button>
      <button onClick={divide}>/</button>
      <button onClick={clear}>Clear</button>
    </div>
  );

export default Calculator;
