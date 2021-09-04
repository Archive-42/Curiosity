import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root'
import { HashRouter, Route } from 'react-router-dom'

import * as APIUtils from './util/api_util'
import {receivePokemon} from './actions/pokemon_actions'

document.addEventListener("DOMContentLoaded", ()=>{
    const root = document.getElementById("root")
    const store = configureStore();

    window.store = store;
    window.receive = receivePokemon;
    window.fetch = APIUtils.fetchPokemonById
    ReactDOM.render(<Root store={store}/>,root)
});