import React from "react";
import {
  CssBaseline,
} from "@material-ui/core";
import NavBar from './NavBar';
import Theme from './Theme';
import Home from './Home';
function App() {
  return (
    <>
      <CssBaseline />
      <Theme>
        <NavBar />
        <Home/>
      </Theme>
    </>
  );
}

export default App;
