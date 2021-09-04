import React from "react";
import { Route, Link, NavLink } from "react-router-dom";
import Red from "./Red";
import Green from "./Green";
import Blue from "./Blue";
import Violet from "./Violet";

const Rainbow = (props) => (
  <div>
    <h1>Rainbow Router</h1>
    <NavLink to="/red" activeClassName="parent-active" >Red</NavLink>
    <NavLink to="/green" activeClassName="parent-active" >Green</NavLink>
    <NavLink to="/blue" activeClassName="parent-active" >Blue</NavLink>
    <NavLink to="/violet" activeClassName="parent-active" >Violet</NavLink>
    <div id="rainbow"></div>
    <Route path="/red" component={Red} />
    <Route path="/green" component={Green} />
    <Route path="/blue" component={Blue} />
    <Route path="/violet" component={Violet} />
  </div>
);

export default Rainbow;
