import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { imageUrl } from './config';
import PokemonDetail from './PokemonDetail';

class PokemonBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.pokemon) {
      return null;
    }
    return (
      <main>
        <nav>
          {this.props.pokemon.map(pokemon => {
            return (
              <NavLink key={pokemon.name} to={`/pokemon/${pokemon.id}`}>
                <div className="nav-entry">
                  <div className="nav-entry-image"
                       style={{backgroundImage: `url('${imageUrl}${pokemon.imageUrl}')`}}>
                  </div>
                  <h1>{pokemon.name}</h1>
                </div>
              </NavLink>
            );
          })}
        </nav>
        <Route path="/pokemon/:id" render={props => <PokemonDetail {...props} token={this.props.token} />} />
      </main>
    );
  }
}

export default PokemonBrowser;
