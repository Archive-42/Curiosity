import React from "react";
import App from "./App";
import UserContext from "./contexts/UserContext";

class AppWithContext extends React.Component {
  constructor() {
    super();

    this.state = {
      authToken: localStorage.getItem("authToken") || null,
      currentUserId: localStorage.getItem("currentUserId") || null,
      updateContext: this.updateContext,
    };
  }

  updateContext = (authToken, currentUserId) => {
    this.setState(
      {
        authToken,
        currentUserId,
      },
      () => {
        console.log(this.state);
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("currentUserId", currentUserId);
      }
    );
  };

  render() {
    return (
      <UserContext.Provider value={this.state}>
        <App />
      </UserContext.Provider>
    );
  }
}

export default AppWithContext;
