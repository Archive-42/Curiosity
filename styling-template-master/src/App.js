import React, { Component } from "react";
import Home from "./pages/Home";
import GlobalStyles from "./components/globals/GlobalStyles";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyles />
        <Home />
      </React.Fragment>
    );
  }
}

export default App;
