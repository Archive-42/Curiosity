import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import { createUser } from '../../store/mainActions/userActions'
import ErrorMessages from '../mylib/ErrorMessages'


const SignUpForm = ({ auth, setAuth }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("@gmail.com");
  const [password, setPassword] = useState("password");
  const [repeatPassword, setRepeatPassword] = useState("password");
  const [errors, setErrors] = useState([])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password);
      if (!user.errors) {
        setAuth(true);
        dispatch(createUser(user))
      } else {
        setErrors(user.errors)
      }
    }
  }

  if (auth) return <Redirect to="/" />

  const updateUsername = (e) => setUsername(e.target.value);
  const updateEmail = (e) => setEmail(e.target.value);
  const updatePassword = (e) => setPassword(e.target.value);
  const updateRepeatPassword = (e) => setRepeatPassword(e.target.value);

  return (
    <form onSubmit={onSignUp} className="lo-box-med, lo-center-h" style={{width: "50%"}}>
    <h2>Create an account!</h2>
      <ErrorMessages errors={errors} />
      <div>
        <label className="lo-txt-con">User Name
        <input
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          />
        </label>
      </div>
      <div>
        <label className="lo-txt-con">Email
        <input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          />
        </label>
      </div>
      <div>
        <label className="lo-txt-con">Password
        <input
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          />
        </label>
      </div>
      <div>
        <label className="lo-txt-con">Repeat Password
        <input
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          /></label>
      </div>
      <button type="submit" className="lo-wow">Sign Up <i className="fas fa-signature" style={{marginTop: "0.4rem"}}></i><i className="fas fa-pen-fancy"></i></button>
    </form>
  );
};

export default SignUpForm;
