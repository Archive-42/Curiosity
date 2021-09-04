import React from 'react'
import { NavLink } from 'react-router-dom'
import LogoutButton from './auth/LogoutButton'

export default function Footer({ auth, setAuth }) {

  console.info("stuff", auth)
  return (
    <div className="btm-wrap">
    <footer className="btm">
      <nav>
        <ul className="btm-con">
          <li><NavLink to="#top">[INSERT LOGO]</NavLink></li>
          <li><NavLink to={`/`} exact={true} activeClassName="active">Home</NavLink></li>
          <li><NavLink to={`/gallery`} exact={true} activeClassName="active">Chronicles Gallery</NavLink></li>
          <li><NavLink to={`/library`} exact={true} activeClassName="active">Library</NavLink></li>

          {auth && <>
            <li><NavLink to={`/worldweaver`} exact={true} activeClassName="active">WorldWeaver</NavLink></li>
            <li><NavLink to={`/talespinner`} exact={true} activeClassName="active">TaleSpinner</NavLink></li>
            <li><LogoutButton setAuth={setAuth} /></li>
          </>}
          {!auth && <>
            <li><NavLink to={`/login`} exact={true} activeClassName="active">Login</NavLink></li>
            <li><NavLink to={`/sign-up`} exact={true} activeClassName="active">Sign up</NavLink></li>
          </>}

          <li><NavLink to={`/about`} exact={true} activeClassName="active">About</NavLink></li>
          <li><NavLink to={`/contact`} exact={true} activeClassName="active">Contact</NavLink></li>
          <li><NavLink to={`/users`} exact={true} activeClassName="active">Users</NavLink></li>
        </ul>
      </nav>
      <address>&copy; 2020 Alicia Mira Kim</address>
    </footer>
    </div>
  )
}