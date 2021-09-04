import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import { getCreations } from '../../store/mainActions/userActions'
import ErrorMessages from '../mylib/ErrorMessages'

export default function LoginForm({ auth, setAuth }) {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("demo");
  const [password, setPassword] = useState("password");

  const onLogin = async (e) => {
    e.preventDefault();
    const content = await login(username, password);
    if (!content.errors) {
      setAuth(true)
      // TODO Refactor this into one dispatch!
      dispatch(getCreations(content))
    } else {
      setErrors(content.errors);
    }
  };

  const updateUsername = (e) => setUsername(e.target.value)
  const updatePassword = (e) => setPassword(e.target.value)

  if (auth) return <Redirect to="/" />

  return (<>
    <form onSubmit={onLogin} className="lo-box-med, lo-center-h" style={{width: "50%"}}>
    <h2>Login</h2>
      <ErrorMessages errors={errors} />
      <div>
        <label htmlFor="username" className="lo-txt-con">Username
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={updateUsername}
        />
        </label>
      </div>
      <div>
        <label htmlFor="password" className="lo-txt-con">Password
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        </label>
        <button type="submit" className="lo-wow">Login</button>
      </div>
    </form>
  </>)
}
