import React from 'react';
import store from './store';
import {
  addOne,
  subtractOne,
  multiplyByTwo,
  divideByTwo,
  resetCalculator,
} from './actions';
import Calculator from './Calculator';

class CalculatorContainer extends React.Component {
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
      <Calculator
        result={result}
        add={this.add}
        subtract={this.subtract}
        multiply={this.multiply}
        divide={this.divide}
        clear={this.clear}
      />
    );
  }
}

export default CalculatorContainer;
