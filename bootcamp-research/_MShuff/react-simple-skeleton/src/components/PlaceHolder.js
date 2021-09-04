import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authentication';


const PlaceHolder = () => {
  const dispatch = useDispatch();
  
  const handleClick = () => dispatch(logout());
    
  return (
    <>
      <h1>Protected Main Page</h1>
      <button onClick={handleClick} >Log Out</button>
    </>
  )
};

export default PlaceHolder;