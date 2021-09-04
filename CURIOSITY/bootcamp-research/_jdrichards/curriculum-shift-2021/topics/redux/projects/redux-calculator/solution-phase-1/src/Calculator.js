import React from 'react';
import store from './store';
import {
  addOne,
  subtractOne,
  multiplyByTwo,
  divideByTwo,
  resetCalculator,
} from './actions';

class Calculator extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  add = () => {
    store.dispatch(addOne());
  }

  subtract = () => {
    store.dispatch(subtractOne());
  }

  multiply = () => {
    store.dispatch(multiplyByTwo());
  }

  divide = () => {
    store.dispatch(divideByTwo());
  }

  clear = () => {
    store.dispatch(resetCalculator());
  }

  render() {
    const result = store.getState();

    return (
      <div>
        <h1>Result: {result}</h1>
        <br />
        <button onClick={this.add}>+</button>
        <button onClick={this.subtract}>-</button>
        <button onClick={this.multiply}>*</button>
        <button onClick={this.divide}>/</button>
        <button onClick={this.clear}>Clear</button>
      </div>
    );
  }
}

export default Calculator;
