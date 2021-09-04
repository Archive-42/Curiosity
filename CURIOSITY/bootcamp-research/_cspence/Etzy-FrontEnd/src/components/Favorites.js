import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux/lib/hooks/useSelector';
import Theme from '../Theme';
import ProductCard from './ProductCard';

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

const Favorites = (props) => {
  const classes = useStyles();
  const userFavorites = useSelector(state => state.authentication.currentUser.FavoriteProducts);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {userFavorites.map((fav, i) => (
          <Grid item key={i} xs={3}>
            <ProductCard product={fav} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Favorites;