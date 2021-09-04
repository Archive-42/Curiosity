import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

const font = 'Kreon, serif';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#177E89'
    },
    secondary: {
      main: '#5CB5AD'
    },
    success: {
      main: '#A0ECD0'
    },
    error: {
      main: '#DA5552'
    },
    warning: {
      main: '#FA8334',
    },
    info: {
      main: '#7775A9'
    },
    background: {
      main: '#FFFAFA'
    }
  },
  typography: {
    fontFamily: font,
    button: {
      textTransform: 'none'
    }
  }
});

const Theme = (props) => {
  return (
    <ThemeProvider theme={theme} >
      {props.children}
    </ThemeProvider>
  );
};

export default Theme;