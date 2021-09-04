import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// import StorefrontIcon from '@material-ui/icons/Storefront';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/authentication';
import AuthForm from './AuthForm';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { NavLink } from 'react-router-dom';
import { Avatar, Badge } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    textDecoration: 'none'
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [ theme.breakpoints.up('md') ]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [ theme.breakpoints.up('md') ]: {
      display: 'none',
    },
  },
  navlink: {
    color: 'inherit',
    textDecoration: 'none'
  }
}));

const Navbar = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [ anchorEl, setAnchorEl ] = useState(null);
  const loggedIn = useSelector(state => state.authentication.loggedIn);
  const currentUser = useSelector(state => state.authentication.currentUser);
  const cartItems = useSelector(state => Object.keys(state.cart).length);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async e => {
    handleMenuClose();
    await dispatch(logout());
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>
        <NavLink to='/profile' className={classes.navlink}>
          Profile
        </NavLink>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <NavLink to='/purchases' className={classes.navlink}>
          Purchases and Reviews
        </NavLink>
      </MenuItem> */}
      <MenuItem onClick={handleSignOut}>
        <NavLink to='/' className={classes.navlink}>
          Sign Out
        </NavLink>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ background: '#FFFAFA' }}>
        <Toolbar style={{ justifyItems: 'space-around' }}>
          <NavLink to='/' className={classes.title}>
            <Typography className={classes.title} variant="h3" color="primary" noWrap>
              etZy
            </Typography>
          </NavLink>
          <div className={classes.grow} />
          {loggedIn ?
            <ButtonGroup variant="text" color="primary">
              {/* <Button color="primary" startIcon={<FavoriteIcon />}>
                <NavLink to='/favorites' className={classes.navlink}>
                  Favorites
                </NavLink>
              </Button> */}
              {/* <Button color="primary" startIcon={<StorefrontIcon />}>
                <NavLink to='/myshops' className={classes.navlink} >
                  Shop Manager
                </NavLink>
              </Button> */}
              <Button
                edge="end"
                onClick={handleProfileMenuOpen}
                color="primary"
                startIcon={<Avatar alt={`${currentUser.name} ${currentUser.lastName}`} src={currentUser.avatar} />}
              >
                You
              </Button>
              <NavLink to='/cart' className={classes.navlink} >
                <Button color="primary" startIcon={
                  <Badge badgeContent={cartItems} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                } />
              </NavLink>
            </ButtonGroup> :
            <ButtonGroup variant="text" color="primary">
              <AuthForm />
              <NavLink to='/cart' className={classes.navlink} >
                <Button color="primary" startIcon={
                  <Badge badgeContent={cartItems} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                } />
              </NavLink>
            </ButtonGroup>
          }
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};

export default Navbar;
