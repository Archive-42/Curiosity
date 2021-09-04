import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginBottom: '10px',
          borderBottom: '2px solid black'
        }}
      >
        <li>
          <NavLink exact to='/'>
            Home
          </NavLink>
        </li>
        <li>
          <ProfileButton user={sessionUser} />{' '}
        </li>

        <li>
          <NavLink exact to='/calendar'>
            Calendar
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/chart'>
            Chart
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/appointments'>
            Appointments
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/date'>
            DatePicker
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/googer'>
            Map
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/upload'>
            Upload
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/upload-base'>
            Upload64
          </NavLink>
        </li>
        <li>
          <NavLink exact to='/create-user'>
            CreateUser Upload
          </NavLink>
        </li>
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to='/signup'>Sign Up</NavLink>
      </>
    );
  }

  return <ul style={{ textDecoration: 'none' }}>{isLoaded && sessionLinks}</ul>;
}

export default Navigation;
