import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import ProductCard from './ProductCard';
import { removeAll } from '../store/actions/cart';

const useStyles = makeStyles(theme => ({
  noDeco: {
    textDecoration: 'none'
  },
  cart: {
    flexGrow: 1,
    width: '60%',
    margin: '60px auto'
  },
  subtitles: {
    margin: '10px'
  }
}));

const Cart = (props) => {
  const cart = useSelector(state => state.cart);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = e => {
    dispatch(removeAll());
  };

  return (
    <>
      <Grid className={classes.cart} container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" color="initial">Cart ({Object.keys(cart).length})</Typography>
        </Grid>
        {Object.keys(cart).length ?
          Object.keys(cart)
            .map(productId => (
              <Grid item key={productId} xs={3}>
                <ProductCard product={cart[ productId ]} />
              </Grid>
            )) : ''
        }
        <Grid item xs={12}>
          <Typography variant="h6" color="initial">${Object.keys(cart).reduce((acc, i) => (parseFloat(acc) + parseFloat(cart[ i ].price)), 0).toFixed(2)}</Typography>
        </Grid>
        <Grid item xs={12}>
          <NavLink to='/' className={classes.noDeco}>
            <Button color='primary' variant='contained' onClick={handleSubmit}>Place Order</Button>
          </NavLink>
        </Grid>
      </Grid>
    </>
  );
};

export default Cart;