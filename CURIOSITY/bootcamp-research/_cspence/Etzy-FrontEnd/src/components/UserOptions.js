import React, { useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { logout } from '../store/actions/authentication';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  userOptions: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  }
}));

const UserOptions = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [ open, setOpen ] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleLogout = async e => {
    handleClose(e);
    await dispatch(logout());
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [ open ]);

  return (
    <div className={classes.userOptions}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Avatar
            className={classes.small}
            alt="etZy Icon"
            src="/images/android-chrome-512x512.png"
          />
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>
                      <NavLink to='/profile'>
                        Profile
                      </NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <NavLink to='/purchases'>
                        Purchases and Reviews
                      </NavLink>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <NavLink to='/'>
                        Sign Out
                      </NavLink>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};

export default UserOptions;