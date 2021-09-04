import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = props => {
  const { isLoggedIn } = props
  if(!isLoggedIn) {
    return <Redirect to='/login' />
  }
  return <Route {...props} />
}