import { List, ListItem, Paper } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StoreRoundedIcon from '@material-ui/icons/StoreRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

// TODO : Set anchor ref - pass through props if possible
const UserOptions = (props) => {

    const handleLogout = e => {
        // TODO: Log out the user
    }

    return (
        <Paper>
            <List>
                <ListItem button component={NavLink} to='/Profile'>
                    <AccountCircleRoundedIcon /> Profile
                </ListItem>
                <ListItem button component={NavLink} to='/Profile'>
                    <StoreRoundedIcon /> Shop
                </ListItem>
                <ListItem button component={NavLink} to='/Profile'>
                    <FavoriteIcon /> Favorites
                </ListItem>
                <ListItem button component={NavLink} to='/Profile'>
                    <ShoppingCartIcon /> Cart
                </ListItem>
                <ListItem button component={NavLink} to='/' onClick={handleLogout}>
                    <PowerSettingsNewIcon /> Sign Out
                </ListItem>
            </List>
        </Paper>
    );
}

export default UserOptions;
