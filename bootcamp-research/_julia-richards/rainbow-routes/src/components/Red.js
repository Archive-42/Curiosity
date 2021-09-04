import React from "react";
import { NavLink, Route, Link } from "react-router-dom";
import Orange from "./Orange";
import Yellow from "./Yellow";

const Red = () => (
  <div>
    <h2 className="red">Red</h2>
    <NavLink exact to="/red">
      Red Only
    </NavLink>
    <NavLink to="/red/orange">Add Orange</NavLink>
    <NavLink to="/red/yellow">Add Yellow</NavLink>
    <Route path="/red/orange" component={Orange} />
    <Route path="/red/yellow" component={Yellow} />
  </div>
);

export default Red;
