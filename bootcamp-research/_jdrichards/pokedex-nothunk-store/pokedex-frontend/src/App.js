import { BrowserRouter, Route, Switch } from "react-router-dom";

import PokemonBrowser from "./components/PokemonBrowser";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={["/", "/pokemon", "/pokemon/:pokemonId"]}
          exact
        >
          <PokemonBrowser />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
