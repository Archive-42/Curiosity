import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

//Components
import Typing from "./Body/Typing/TypingRoot";
import Profile from "./Body/Profile/Profile";
import HighScores from "./Body/HighScores";
import Reaction from "./Body/Reaction/ReactionField";
import Memory from "./Body/Memory/Memory";

const PrivateRoute = (props) => {
  const isLoggedIn = useSelector((state) => (state.session ? true : false));
  const { component: Component, path, exact } = props;
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => <Component {...props} />}
    />
  );
};

const Body = (props) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Switch>
        <Route exact path="/typing" render={(props) => <Typing {...props} />} />
        <Route
          exact
          path="/reaction"
          render={(props) => <Reaction {...props} />}
        />
        <Route exact path="/memory" render={(props) => <Memory {...props} />} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <Route
          exact
          path="/ranks"
          render={(props) => <HighScores {...props} />}
        />
        <Route path="*" render={(props) => <Typing {...props} />} />
      </Switch>
    </div>
  );
};

export default Body;
