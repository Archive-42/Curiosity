import { Card, CardActionArea, CardContent, CardMedia, createStyles, Typography } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';

const useStyles = createStyles(theme => ({
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

const ShopCard = ({ shop }) => {
  const classes = useStyles();

  return (
    <>
      <NavLink to={`/shop/${shop.id}`} style={{ textDecoration: 'none' }}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`https://cdn.shopify.com/s/files/1/0012/8155/6516/files/christmas-2930915_1280_large.jpg?v=1576046473`}
              title={shop.name}
            />
            <CardContent className={classes.pricing}>
              <Typography variant="body2" color="textSecondary" component="p" className={classes.price}>
                {shop.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </NavLink>
    </>
  );
};

export default ShopCard;