import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

//Components
import { AuthContext } from "../context/Context";
import LoginForm from "./Header/LoginForm";
import SignupForm from "./Header/SignupForm";
import Settings from "./Header/Settings";
import Dashboard from "./Header/Dashboard";
import Help from "./Header/Help";

//Mui
import { makeStyles, Typography, IconButton, Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

//Icons
import PersonIcon from "@material-ui/icons/Person";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles((theme) => ({
  navBar_icon: {
    minWidth: "1.5rem",
    maxWidth: "3rem",
  },
  iconButton: {
    "&.MuiIconButton-root": {
      borderRadius: ".5rem",
      padding: ".5rem",
    },
  },
  dialog: {
    width: "auto",
    height: "auto",
  },
}));

const getParams = () => {
  return window.location.pathname.slice(1);
};

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const loadedUser = useSelector((state) => state.session.user);
  const { authDialog, setAuthDialog } = useContext(AuthContext);

  const [user, setUser] = useState();
  const [whichDialog, setWhichDialog] = useState("");
  const [params, setParams] = useState(getParams());

  useEffect(() => {
    JSON.stringify(loadedUser) === "{}" ? setUser(null) : setUser(loadedUser);
  }, [loadedUser]);

  const navs = [
    {
      title: "Dashboard",
      redirect: false,
      path: "dashboard",
      icon: <DashboardIcon color="primary" />,
    },
    {
      title: "Help",
      redirect: false,
      path: "help",
      icon: <HelpOutlineIcon color="primary" />,
    },
  ];

  const handleClose = () => {
    setAuthDialog(false);
  };

  const handleNavClick = (path) => {
    history.push(path);
    setParams(getParams());
  };

  const handleMenuClick = (path) => {
    setWhichDialog(path);
    setAuthDialog(true);
  };

  const renderDialog = (dialog) => {
    switch (dialog) {
      case "login":
        return (
          <LoginForm
            whichDialog={whichDialog}
            setWhichDialog={setWhichDialog}
          />
        );
      case "signup":
        return <SignupForm />;
      case "settings":
        return (
          <Settings
            getParams={() => getParams()}
            user={user}
            setParams={(path) => setParams(path)}
          />
        );
      case "dashboard":
        return (
          <Dashboard
            getParams={() => getParams()}
            setParams={(path) => setParams(path)}
          />
        );
      case "help":
        return <Help getParams={() => getParams()} />;
      default:
        return;
    }
  };

  return (
    <>
      <div className={"navBar_root"}>
        {/* LEFT */}
        <div className={"navBar_left"}>
          <Button>
            <Typography color="primary">
              human_{params ? params : "specs"}
            </Typography>
          </Button>
        </div>

        {/* MIDDLE */}
        <div className={"navBar_middle"}>
          <div className={"navBar_iconContainer"}>
            {navs.map((navItem) => (
              <IconButton
                className={classes.iconButton}
                key={navItem.title}
                title={navItem.title}
                onClick={() => handleMenuClick(navItem.path)}
              >
                {navItem.icon}
              </IconButton>
            ))}
            <Button
              className={classes.iconButton}
              title={user ? "Profile" : "Login"}
              startIcon={<PersonIcon color="primary" />}
              onClick={() =>
                user ? handleNavClick("/profile") : handleMenuClick("login")
              }
            >
              <Typography color="primary">
                {user ? `${user.username}` : "Login"}
              </Typography>
            </Button>
          </div>
        </div>

        {/* RIGHT */}
        <div className={"navBar_right"}>
          <div className={"navBar_iconContainer"}>
            <IconButton
              className={classes.iconButton}
              title={"settings"}
              onClick={() => handleMenuClick("settings")}
            >
              <SettingsIcon color="primary" />
            </IconButton>
          </div>
        </div>
      </div>
      <Dialog
        open={authDialog}
        onClose={handleClose}
        className={classes.dialog}
        aria-labelledby="form-dialog-title"
      >
        {renderDialog(whichDialog)}
      </Dialog>
    </>
  );
};

export default Header;
