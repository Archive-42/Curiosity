import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import logo from '../../images/redlogo.png';
import { NavLink } from 'react-router-dom';
import Menu from './Menu';


const Nav = () => {

    return(
        <div className='nav-bar'>
            <img className='logo' src={logo} alt='logo' />
            <NavLink to='/' className='logo-nav-link'>
                <p className='vidalia-nav-title-home'>Vidalia</p>
            </NavLink>
            <Tooltip title='Characters'>
                <NavLink exact to='/characters' className='nav-links'>
                    <i className="fas fa-hat-wizard barracks-icon"></i>
                </NavLink>
            </Tooltip>
            <Tooltip title='Survival'>
                <NavLink exact to='/survival-start' className='nav-links'>
                    <i className="fas fa-dungeon sign-icon"></i>
                </NavLink>
            </Tooltip>
            <Tooltip title='Quests'>
                <NavLink exact to='/quests' className='nav-links'>
                    <i className="fas fa-dice-d20 sign-icon"></i>
                </NavLink>
            </Tooltip>
            <Menu />
        </div>
    )
}


export default Nav;