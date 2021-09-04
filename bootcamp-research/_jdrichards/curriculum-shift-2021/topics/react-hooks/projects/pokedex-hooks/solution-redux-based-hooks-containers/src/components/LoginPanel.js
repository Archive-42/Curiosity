import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as AuthActions from '../actions/authentication';

const LoginPanel = ({ token, login }) => {
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const updateEmail = e => setEmail(e.target.value);
  const updatePassword = e => setPassword(e.target.value);

  if (token) {
    return <Redirect to="/" />;
  }

  return (
    <main className="centered middled">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail} />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword} />
        <button type="submit">Login</button>
      </form>
    </main>
  );
};

const LoginPanelContainer = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.authentication.token);
  const login = (email, password) => dispatch(AuthActions.login(email, password));
  return <LoginPanel token={token} login={login} />;
};

export default LoginPanelContainer;
