import React from 'react';
import ReactDOM from 'react-dom';
// import * as APIUtil from './util/session_api_util'
import configureStore from './store/store'
import { login, signup, logout } from './actions/session_actions'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const store = configureStore();
  window.login = login
  window.logout = logout
  window.signup = signup
  window.store = store
  window.getState = store.getState;
  window.dispatch = store.dispatch;

  ReactDOM.render(<h1>Welcome to BenchBnB</h1>, root);
});