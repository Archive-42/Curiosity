import {connect} from 'react-redux'

import PokemonDetail from './pokemon_detail'
import { requestPokemonById } from '../../actions/pokemon_actions'

const mapStateToProps = (state, ownProps) => {
  const pokeId = ownProps.match.params.pokeId
  return {
        pokemon: state.entities.pokemon[pokeId],
        items: state.entities.items
    }    
}

const mapDispatchToProps = dispatch => {
    return { requestPokemonById: (id) => dispatch(requestPokemonById(id)) } 
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PokemonDetail)