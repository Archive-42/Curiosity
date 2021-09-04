import React from "react";
import {Redirect} from 'react-router-dom'
import { logout } from "../../services/auth";

const LogoutButton = ({setAuth}) => {
  const onLogout = async (e) => {
    await logout();
    setAuth(false)
    return <Redirect to="/login" />
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
