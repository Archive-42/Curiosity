import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

const initialState = localStorage.getItem('state') ?
  JSON.parse(localStorage.getItem('state')) :
  {
    authentication: {
      loggedIn: false,
      token: null,
      currentUser: {
        firstName: '',
        lastName: '',
        avatar: '',
        createdAt: '',
        Shops: [],
        FavoriteShops: [],
        FavoriteProducts: [],
        Followers: [],
        Following: []
      }
    },
    productlist: {
      productList: []
    },
    product: {
      product: null,
      productReviews: [],
      shopreviews: []
    },
    shop: {},
    cart: {},
    favorite: {
      products: [],
      shops: []
    },
  };

const store = configureStore(initialState);

store.subscribe(() => {
  window.localStorage.setItem('appState', { ...store.getState() });
  console.log(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
