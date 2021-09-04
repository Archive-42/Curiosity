import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/store.js';
import { receiveTodos, receiveTodo, fetchTodos } from './actions/todo_actions';
import Root from './components/root';
import allTodos from './reducers/selectors';

const store = configureStore();

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('content');
  window.store = store;
  ReactDOM.render(<Root store={store}/>, root);
});

