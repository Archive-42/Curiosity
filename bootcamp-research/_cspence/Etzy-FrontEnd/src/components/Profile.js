// import { Avatar } from '@material-ui/core';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux/lib/hooks/useDispatch';
import { getProducts } from '../store/actions/productlist';
import ProductCard from './ProductCard';
// import ShopCard from './ShopCard';
// import Favorites from './Favorites';

const useStyles = makeStyles((theme) => ({
  title: {
    textDecoration: 'none'
  },
  root: {
    flexGrow: 1,
    width: '60%',
    margin: '60px auto'
  },
  subtitles: {
    margin: '10px'
  }
}));

const Profile = (props) => {
  // const user = useSelector(state => state.authentication.currentUser);
  const classes = useStyles();
  const products = useSelector(state => state.productlist.productList);
  const loggedIn = useSelector(state => state.authentication.loggedIn);
  const firstName = useSelector(state => state.authentication.currentUser.firstName);
  const userFavorites = useSelector(state => state.authentication.currentUser.FavoriteProducts);
  // const shop = useSelector(state => state.authentication.currentUser.Shops[ 0 ]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className={classes.root}>
      {loggedIn ?
        <>
          <Typography className={classes.subtitles} variant='h3'>{`Welcome Back, ${firstName}!`}</Typography>
          {userFavorites ?
            <>
              <Typography variant="h5">{`Here are some of your favorites:`}</Typography>
              <Grid container spacing={3}>
                {userFavorites.map((fav, i) => (
                  <Grid item key={i} xs={3}>
                    <ProductCard product={fav} />
                  </Grid>
                ))}
              </Grid>
              <Typography className={classes.subtitles} variant="h5">{`Check out what's popular:`}</Typography>
              <Grid container spacing={3}>
                {products ?
                  products
                    .map(product => (
                      <Grid item key={product.id} xs={3}>
                        <ProductCard product={product} />
                      </Grid>
                    )) : ''
                }
                {/* <Grid item key={shop.id} xs={3}>
                  <ShopCard shop={shop} />
                </Grid> */}
              </Grid>
            </> : ''}
        </> :
        <Grid container spacing={3}>
          {products ?
            products.map(product => (
              <Grid item key={product.id} xs={3}>
                <ProductCard product={product} />
              </Grid>
            )) : ''
          }
        </Grid>}

    </div>
  );
};

export default Profile;