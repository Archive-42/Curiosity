import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
import {
  addOne,
  subtractOne,
  multiplyByTwo,
  divideByTwo,
  resetCalculator,
} from './actions';

window.store = store;

window.addOne = addOne;
window.subtractOne = subtractOne;
window.multiplyByTwo = multiplyByTwo;
window.divideByTwo = divideByTwo;
window.resetCalculator = resetCalculator;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
