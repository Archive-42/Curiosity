import React from "react";
import { NavLink, Route, Link } from "react-router-dom";
import Indigo from "./Indigo";

const Blue = () => (
  <div>
    <h2 className="blue">Blue</h2>
    <NavLink exact to="/blue">
      Blue Only
    </NavLink>
    <NavLink to="/blue/indigo">Add Indigo</NavLink>
    <Route path="/blue/indigo" component={Indigo} />
  </div>
);

export default Blue;
