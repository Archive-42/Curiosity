import React, { useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import Theme from './Theme';
import Navbar from './components/Navbar';
import { Switch, Route } from 'react-router';
import Profile from './components/Profile';
import Cart from './components/Cart';
import Favorites from './components/Favorites';
import ProductContainer from './components/Product';
import Shop from './components/Shop';
import Home from './components/Home';
import Purchases from './components/Purchases';
import MyShops from './components/MyShops';
import ShopForm from './components/ShopForm';
import ProductForm from './components/ProductForm';
import { useDispatch } from 'react-redux';
import { loadCurrentUser } from './store/actions/authentication';

function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      dispatch(loadCurrentUser());
    }
  }, []);

  return (
    <>
      <CssBaseline />
      <Theme>
        <Navbar />
        <Switch>
          {/* <Route exact path='/profile' component={Profile} /> */}
          <Route exact path='/products/:id' component={ProductContainer} />
          <Route exact path='/products/:id/edit' component={ProductForm} />
          {/* <Route exact path='/favorites' component={Favorites} /> */}
          <Route exact path='/shops/:id' component={Shop} />
          <Route exact path='/shops/:id/edit' component={ShopForm} />
          <Route exact path='/myshops' component={MyShops} />
          <Route exact path='/purchases' component={Navbar} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/purchases' component={Purchases} />
          <Route path='/' component={Home} />
        </Switch>
      </Theme>
    </>
  );
}

export default App;
