import React from 'react';
import { Provider } from 'react-redux'
import { HashRouter, Route } from 'react-router-dom';
import PokemonIndexContainer from './pokemon/pokemon_index_container'
             //normally a prop, destructuring using {store}
const Root = ({store}) => {
    return (
        <Provider store={store}>
            <HashRouter>
                <Route path="/" component={PokemonIndexContainer} />
            </HashRouter>
        </Provider>
    )   
}

export default Root;