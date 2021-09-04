import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  navbar: {
    fontFamily: theme.fontFamily,
    background: theme.gradientBackground,
  },
  title: {
    fontSize: theme.typography.h3
  }
}));

const NavBar = (props) => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.navbar}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="open drawer">
          <MenuIcon />
        </IconButton>
        <h1 className={classes.title}>App Title</h1>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
