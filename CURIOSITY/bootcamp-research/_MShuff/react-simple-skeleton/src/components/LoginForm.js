import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../store/authentication';

const LoginForm = () => {
  const [username, setUsername] = useState('demo_user');
  const [password, setPassword] = useState('Password');
  const token = useSelector((state) => state.authentication.token);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

  if (token) {
    return <Redirect to='/' />;
  }
  
  return (
    <main>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Email'
          value={username}
          onChange={updateProperty(setUsername)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={updateProperty(setPassword)}
        />
        <button type='submit'>Login</button>
      </form>
    </main>
  )
};

export default LoginForm;