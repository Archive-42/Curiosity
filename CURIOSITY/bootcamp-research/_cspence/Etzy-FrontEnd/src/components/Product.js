import { Button, ButtonGroup, IconButton, makeStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../store/actions/product';
import { addToCart } from '../store/actions/cart';
import Reviews from './Reviews';
import { toggleFavoriteProduct } from '../store/actions/favorite';

const useStyles = makeStyles((theme) => ({
  imgBtn: {
    maxWidth: '100%',
  },
  mainImg: {
    margin: 0,
    maxWidth: '50%'
  },
  btnContainer: {
    maxWidth: '10%',
    margin: 0
  },
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      alignItems: 'center'
    },
  }
}));

const Product = ({ product, productReviews, shopReviews, getProduct }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();
  const [ image, setImage ] = useState(product.product ? product.product.images.split(',')[ 0 ] : null);
  const loggedIn = useSelector(state => state.authentication.loggedIn);
  const currentUser = useSelector(state => state.authentication.currentUser);

  useEffect(() => {
    getProduct(id);
  }, []);

  const handleFavorite = () => {
    dispatch(toggleFavoriteProduct(window.localStorage.getItem('userId'), product.product.id));
  };

  const addItemToCart = e => {
    dispatch(addToCart(product.product));
    window.location.reload();
  };

  if (!product.product) {
    return null;
  }
  return (
    <>
      <div className={classes.root}>
        <ButtonGroup className={classes.btnContainer}
          orientation="vertical"
          color="primary"
          variant="text">
          {product.product.images.split(',').map((img, i) => {
            return <Button key={i} onClick={() => setImage(img)}>
              <img src={img} className={classes.imgBtn} alt={`${product.product.name}-${i}`} />
            </Button>;
          })}
        </ButtonGroup>
        <img className={classes.mainImg} src={image ? image : product.product.images.split(',')[ 0 ]} alt={product.product.name} />
        <div>
          <h1>{product.product.name}{!loggedIn ? '' :
            currentUser.FavoriteProducts.map(prod => prod.id).includes(product.product.id) ?
              <IconButton onClick={handleFavorite}>
                <FavoriteIcon color="error" />
              </IconButton> :
              <IconButton onClick={handleFavorite}>
                <FavoriteBorderIcon />
              </IconButton>
          }
          </h1>
          <p>{product.product.description}</p>
          <h3>${product.product.price.toFixed(2)}</h3>
          <Button variant="contained" color="primary" onClick={addItemToCart}>
            Add To Cart
        </Button>
        </div>
      </div>
      <Reviews productReviews={product.productReviews} shopReviews={product.shopReviews} />
    </>
  );
};

const ProductContainer = () => {
  const product = useSelector(state => state.product);
  const dispatch = useDispatch();
  return (
    <Product
      product={product}
      productReviews={product.productReviews}
      shopReviews={product.shopReviews}
      getProduct={(id) => dispatch(getProduct(id))}
    />
  );
};

export default ProductContainer;