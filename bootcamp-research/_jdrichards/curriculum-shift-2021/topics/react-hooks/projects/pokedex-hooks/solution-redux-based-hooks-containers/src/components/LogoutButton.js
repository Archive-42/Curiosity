import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as AuthAction from '../actions/authentication';

const LogoutButton = ({ loggedOut, logout }) => {
  const handleClick = () => logout();

  if (loggedOut) {
    return <Redirect to="/login" />;
  }

  return (
    <div id="logout-button-holder">
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

const LogoutButtonContainer = () => {
  const dispatch = useDispatch();
  const logout = () => dispatch(AuthAction.logout());
  const loggedOut = useSelector(state => !state.authentication.token);

  return <LogoutButton loggedOut={loggedOut} logout={logout} />;
};

export default LogoutButtonContainer;
