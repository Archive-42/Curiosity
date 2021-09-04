import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia, IconButton, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 245,
    position: "relative"
  },
  media: {
    height: 0,
    paddingTop: "70%"
  },
  favFab: {
    position: "absolute",
    top: "5px",
    right: "5px",
    background: 'rgba(255, 255, 255, 0.5)',
  },
  favFabFav: {
    color: '#000',
  },
  pricing: {
    height: '3em',
    display: 'flex'
  },
  price: {
    alignSelf: 'center',
  }
}));

const ProductCard = ({ product }) => {
  const classes = useStyles();
  const loggedIn = useSelector(state => state.loggedIn);
  const currentUser = useSelector(state => state.authentication.currentUser);

  const handleFavorite = e => {
    e.preventDefault();
    if (e.target.classList.contains(classes.favFabFav)) {
      e.target.classList.remove(classes.favFabFav);
    }
    else {
      e.target.classList.add(classes.favFabFav);
    }
  };


  return (
    <>
      <NavLink to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
        <Card className={classes.root}>
          <CardActionArea>
            {console.log(product)}
            <CardMedia
              className={classes.media}
              image={product.images.split(',')[ 0 ]}
              title={product.name}
            />
            {!loggedIn ? '' :
              currentUser.favoriteProducts.includes(product.id) ?
                <IconButton className={classes.favFab} onClick={handleFavorite}>
                  <FavoriteIcon />
                </IconButton> :
                <IconButton className={classes.favFab} onClick={handleFavorite}>
                  <FavoriteBorderIcon />
                </IconButton>
            }
            <CardContent className={classes.pricing}>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.price}>
                ${product.price.toFixed(2)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </NavLink>
    </>
  );
};

export default ProductCard;