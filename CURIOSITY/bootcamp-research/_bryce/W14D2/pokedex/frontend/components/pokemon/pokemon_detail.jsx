import React from 'react'
import { Link, Route } from 'react-router-dom';
import ItemDetailContainer from '../items/item_detail_container'

class PokemonDetail extends React.Component{
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const {pokemon, items } = this.props
        const itemsImages = Object.keys(items).map(itKey => {
            return <Link to={`/pokemon/${pokemon.id}/item/${itKey}`} key={itKey}><img  src={items[itKey].image_url} className="small"></img></Link>
        });
        if (!pokemon) return null;
        let moves = pokemon.moves === undefined ? [] : pokemon.moves
        return (
            <div className="pokemon-detail">
                <img src={pokemon.image_url}></img>
                <h1>{pokemon.name}</h1>
                <p>Type: {pokemon.poke_type}</p>
                <p>Attack: {pokemon.attack}</p>
                <p>Defense: {pokemon.defense}</p>
                <p>Moves: {moves.join(", ")}</p>
                <div className='item-box'>
                    <h1>Items</h1>
                    <div className='item-images'>
                        {itemsImages}
                    </div>
                    <Route path="/pokemon/:pokemonId/item/:itemId" component={ItemDetailContainer} />
                </div>
            </div>
        )
    }

    componentDidMount(){
        this.props.requestPokemonById(this.props.match.params.pokeId)
    }

    componentDidUpdate(prevProps){
        if (this.props.match.params.pokeId !== prevProps.match.params.pokeId){
            this.props.requestPokemonById(this.props.match.params.pokeId);
        }
    }
} 
export default PokemonDetail