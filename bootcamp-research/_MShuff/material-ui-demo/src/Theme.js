import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  gradientBackground: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  fontFamily: "Georgia",
  palette: {
    primary: {
      main: '#00f',
    },
    secondary: {
      main: '#0f0'
    }
  },
  typography: {
    fontFamily: "Georgia"
  }
});
console.log(theme);

const Theme = props => {
  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  )
}

export default Theme;
