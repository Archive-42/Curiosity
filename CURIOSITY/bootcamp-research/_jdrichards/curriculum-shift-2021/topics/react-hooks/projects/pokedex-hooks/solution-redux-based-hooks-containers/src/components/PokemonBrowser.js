import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import { imageUrl } from '../config';
import LogoutButton from './LogoutButton';
import PokemonDetail from './PokemonDetail';
import PokemonForm from './PokemonForm';
import Fab from './Fab';
import * as PokemonAction from '../actions/pokemon';

const PokemonBrowser = ({
  token,
  match,
  pokemonList,
  formVisible,
  getPokemon,
  showForm
}) => {
  const { pokemonId } = useParams();

  useEffect(() => {
    getPokemon();
  }, []);

  if (!pokemonList) {
    return null;
  }

  return (
    <main>
      <LogoutButton token={token} />
      <nav>
        <Fab hidden={formVisible} onClick={showForm} />
        {pokemonList.map(pokemon => {
          return (
            <NavLink key={pokemon.name} to={`/pokemon/${pokemon.id}`}>
              <div className={(Number.parseInt(pokemonId) === pokemon.id) ? 'nav-entry is-selected' : 'nav-entry'}>
                <div className="nav-entry-image"
                  style={{ backgroundImage: `url('${imageUrl}${pokemon.imageUrl}')` }}>
                </div>
                <div>
                  <div className="primary-text">{pokemon.name}</div>
                  <div className="secondary-text">Born {new Date(pokemon.updatedAt).toDateString()}</div>
                </div>
              </div>
            </NavLink>
          );
        })}
      </nav>

      {formVisible ?
        <PokemonForm token={token} /> :
        <Route path="/pokemon/:id" render={
          props => <PokemonDetail {...props} token={token} />
        } />
      }
    </main>
  );
};

const PokemonBrowserContainer = () => {
  const dispatch = useDispatch();
  const pokemonList = useSelector(state => state.pokemon.list);
  const formVisible = useSelector(state => state.pokemon.formVisible);
  const getPokemon = () => dispatch(PokemonAction.getPokemon());
  const showForm = () => dispatch(PokemonAction.showForm());

  return (
    <PokemonBrowser
      pokemonList={pokemonList}
      formVisible={formVisible}
      getPokemon={getPokemon}
      showForm={showForm}
    />
  );
};

export default PokemonBrowserContainer;
