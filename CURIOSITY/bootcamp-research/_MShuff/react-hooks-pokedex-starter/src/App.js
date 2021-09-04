import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { baseUrl } from './config';
import { PrivateRoute } from './routesUtil';
import LoginPanel from './LoginPanel';
import PokemonBrowser from './PokemonBrowser';

class App extends React.Component {
  constructor(props) {
    super(props);
    const token = window.localStorage.getItem('state-pokedex-token');
    this.state = {
      loaded: false,
      needLogin: !token,
      pokemon: [],
      token,
    };
  }

  async componentDidMount() {
    this.setState({ loaded: true });
    this.loadPokemon();
  }

  async loadPokemon() {
    const response = await fetch(`${baseUrl}/pokemon`, {
      headers: { Authorization: `Bearer ${this.state.token}`}
    });
    if (response.ok) {
      const pokemon = await response.json();
      this.setState({
        pokemon,
        needLogin: false,
      });
    } else {
      this.setState({
        needLogin: true
      });
    }
  }

  updateToken = token => {
    window.localStorage.setItem('state-pokedex-token', token);
    this.setState({
      needLogin: false,
      token
    });
    this.loadPokemon();
  }

  render() {
    const { loaded, needLogin, pokemon, token } = this.state;

    if (!loaded) {
      return null;
    }
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/login"
            render={props => <LoginPanel {...props} updateToken={this.updateToken} />}
          />
          <PrivateRoute
            path="/"
            component={PokemonBrowser}
            needLogin={needLogin}
            componentProps={{ pokemon, token }}
          />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
