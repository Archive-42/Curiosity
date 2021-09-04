import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import * as sessionActions from "./store/actions/session";

//Component Imports
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { AuthContext } from "./context/Context";

//MUI
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
  useTheme,
} from "@material-ui/core/styles";
import { custom } from "./Theme";

import blue from "@material-ui/core/colors/blue";

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: '#8C5ED7',
//     },
//   },
// });;;

const theme = createMuiTheme({
  palette: {
    primary: {
      // main: '#8C5ED7',
      main: custom.primary.main,
    },
    secondary: {
      main: custom.secondary,
    },
    error: {
      main: custom.primary.incorrect,
    },
    success: {
      main: custom.primary.correct,
    },
    action: {
      active: custom.primary.active,
    },
  },
});

const App = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: "1000px",
      display: "grid",
      gridAutoFlow: "row",
      alignItems: "center",
      minHeight: "96vh",
      padding: "2rem",
      gap: "2rem",
      width: "100%",
      gridTemplateRows: "auto 1fr auto",
      backgroundColor: theme.palette.secondary.main,
    },
  }));

  const theme = useTheme();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <Header />
        <Body />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

const AppContainer = (props) => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [authDialog, setAuthDialog] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(setIsLoaded(true));
  }, [dispatch]);

  return (
    isLoaded && (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <AuthContext.Provider value={{ authDialog, setAuthDialog }}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </AuthContext.Provider>
      </div>
    )
  );
};

export default AppContainer;
