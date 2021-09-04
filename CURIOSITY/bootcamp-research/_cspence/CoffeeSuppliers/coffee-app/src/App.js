import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cart from './components/Cart';
import Profile from './components/Profile';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProductBrowser from './components/ProductBrowser';
import ProductPage from './components/ProductPage';

const App = (props) => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact={true} path='/' component={ProductBrowser} />
        <Route exact={true} path='/categories/:categoryId' component={ProductBrowser} />
        <Route exact={true} path='/profile' component={Profile} />
        <Route exact={true} path='/cart' component={Cart} />
        <Route exact={true} path='/products/:productId' component={ProductPage} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
