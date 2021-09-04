import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    sessionActions.login(dispatch, credential, password).catch((res) => {
      // There is no res.data when it hits this catch. Errors are in the backend terminal returned in the middleware
      // if (res.data && res.data.errors) setErrors(res.data.errors);
      if (res.ok === false) setErrors(['Unauthorized']);
    });
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>

        <input
          type='text'
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          placeholder='username or email'
          required
        />

        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password'
          required
        />

        <button type='submit'>Log In</button>
      </form>
    </>
  );
}

export default LoginForm;
