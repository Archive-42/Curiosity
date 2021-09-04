import { connect } from 'react-redux'

import PokemonForm from './pokemon_form'
import { createPokemon } from '../../actions/pokemon_actions'

// const mapStateToProps = (state, ownProps) => {
//   const pokeId = ownProps.match.params.pokeId
//   return {
//     pokemon: state.entities.pokemon[pokeId],
//     items: state.entities.items
//   }
// }

const mapDispatchToProps = dispatch => {
  return { createPokemon: (pokemon) => dispatch(createPokemon(pokemon)) }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonForm)