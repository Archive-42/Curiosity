import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => (
  <>
    <NavLink exact to='/' className="is-active">Movies</NavLink>
    <NavLink exact to='/login' className="is-active">Log In</NavLink>
    <NavLink exact to='/signup' className="is-active">Sign Up</NavLink>
  </>
);

export default Navigation;