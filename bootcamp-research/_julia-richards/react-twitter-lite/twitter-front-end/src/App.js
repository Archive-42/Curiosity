import React from "react";

import { NavLink, Switch, Route } from "react-router-dom";
import { ProtectedRoute, AuthRoute } from "./Routes";

import Home from "./components/Home";
import Profile from "./components/Profile";
import LoginForm from "./components/session/LoginForm";
import RegistrationForm from "./components/session/RegistrationForm";

function App() {
  return (
    <div>
      <h1>Twitter Lite</h1>
      <nav>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>
      <Switch>
        <AuthRoute path="/register" component={RegistrationForm} />
        <AuthRoute path="/login" component={LoginForm} />
        <ProtectedRoute path="/users/:userId" component={Profile} />
        <ProtectedRoute path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
