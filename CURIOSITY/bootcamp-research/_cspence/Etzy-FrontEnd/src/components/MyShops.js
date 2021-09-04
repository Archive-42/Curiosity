import { Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import ShopCard from './ShopCard';

const MyShops = (props) => {
  const shops = useSelector(state => state.authentication.currentUser.Shops);
  return (
    <>
      <Typography variant='h3'>Your Shops</Typography>
      {shops.length ? shops.map(shop => (
        <ShopCard shop={shop} />)):
        <Typography variant='h2'>You don't have any shops yet</Typography>
      }
    </>
  );
};

export default MyShops;