import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Home from './components/Home';
import { authenticate, unauthenticatedUserInfo } from './store/actions/auth';

const App = (props) => {
  const authenticated = useSelector(state => !!state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticate());
    dispatch(unauthenticatedUserInfo());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar admin={authenticated && authenticated.admin} authenticated={authenticated} />
      <Switch>
        <Route path='/' component={<Home />} />
        <Route path='/cart' component={<Cart />} />
        <Route path='/profile' component={<Profile />} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
