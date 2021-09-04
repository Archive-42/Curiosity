import React, { Suspense, lazy } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import BurgerMenu from "./BurgerMenu";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Maps = lazy(() => import("./pages/Maps"));
const DEMBlender = lazy(() => import("./pages/Maps/DEMBlender"));
const EdibleCampus = lazy(() => import("./pages/Maps/EdibleCampus"));
const PopulationProjections = lazy(() =>
  import("./pages/Maps/PopulationProjections")
);
const SilvertonTrails = lazy(() => import("./pages/Maps/SilvertonTrails"));

function App() {
  return (
    <div id="App">
      <BurgerMenu />
      <main id="page-wrap">
        <Suspense
          fallback={
            <p
              style={{
                position: "absolute",
                top: 6,
                left: 0,
                right: 0,
                color: "#fff"
              }}
            >
              ...
            </p>
          }
        >
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about/" component={About} />
            <Route exact path="/maps/" component={Maps} />
            <Route exact path="/maps/dem_blender" component={DEMBlender} />
            <Route
              exact
              path="/maps/edible_campus_du"
              component={EdibleCampus}
            />
            <Route
              exact
              path="/maps/population_projections"
              component={PopulationProjections}
            />
            <Route
              exact
              path="/maps/silverton_trails/:slug?"
              component={SilvertonTrails}
            />
          </Switch>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
