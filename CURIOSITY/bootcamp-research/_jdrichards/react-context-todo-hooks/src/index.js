import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { TodoProvider } from './contexts/TodoContext';

const Root = () => {
  return (
    <TodoProvider>
      <App />
    </TodoProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
