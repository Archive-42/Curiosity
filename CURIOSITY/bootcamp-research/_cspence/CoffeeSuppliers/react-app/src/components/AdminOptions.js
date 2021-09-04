import React from 'react';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StoreRoundedIcon from '@material-ui/icons/StoreRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { Menu, MenuItem } from '@material-ui/core';

const AdminOptions = (props) => {
    return (
        <Menu>
            <MenuItem button component={NavLink} to='/Profile'>
                <AccountCircleRoundedIcon /> Profile
            </MenuItem>
            <MenuItem button component={NavLink} to='/Profile'>
                <StoreRoundedIcon /> Shop
            </MenuItem>
            <MenuItem button component={NavLink} to='/Profile'>
                <DashboardRoundedIcon /> Dashboard
            </MenuItem>
            <MenuItem button component={NavLink} to='/Profile'>
                <ShoppingCartIcon /> Cart
            </MenuItem>
            <MenuItem button component={NavLink} to='/' onClick={handleLogout}>
                <PowerSettingsNewIcon /> Sign Out
            </MenuItem>
        </Menu>
    );
}

export default AdminOptions;
