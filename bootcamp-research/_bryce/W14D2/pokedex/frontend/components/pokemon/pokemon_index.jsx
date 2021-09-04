import React from 'react'
import PokemonIndexItem from './pokemon_index_item'
import { Route } from 'react-router-dom';
import PokemonDetailContainer from './pokemon_detail_container';
import PokemonFormContainer from './pokemon_form_container'


class PokemonIndex extends React.Component{

    constructor(props){
        super(props)
        this.state ={

        }
    }
    componentDidMount(){
        this.props.requestAllPokemon();
    }

    render(){
        const { pokemon } = this.props
        const lisOfPoke = pokemon.map( (poke) => {
            return (
                <PokemonIndexItem key={poke.id} pokemon={poke} />
                )
            })
            return(
                <div className="pokedex">
                    <Route exact path="/" component={PokemonFormContainer}/>
                    <Route path='/pokemon/:pokeId' component={PokemonDetailContainer}/>
                    <ol className="index">
                        {lisOfPoke}
                    </ol>
                </div>

        );
    }

}

export default PokemonIndex;