import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import PlaceHolder from './components/PlaceHolder';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import { loadToken } from './store/authentication';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const token = useSelector(state => state.authentication.token);
  // const token = false
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    setLoaded(true);
    dispatch(loadToken());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if (!loaded) return null;
  
  return (
  <BrowserRouter>
    <Navigation />
    <Switch>
      <ProtectedRoute isLoggedIn={token} path='/' exact={ true } component={ PlaceHolder } />
      <Route path='/login' exact={ true } component={ LoginForm } />
      <Route path='/signup' exact={ true } component={ SignUpForm } />
    </Switch>
  </BrowserRouter>
  )
}


export default App;