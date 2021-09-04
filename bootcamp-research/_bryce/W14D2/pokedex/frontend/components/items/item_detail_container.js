import ItemDetail from './item_detail'
import { selectPokemonItem } from '../../reducers/selector'
import { connect } from 'react-redux'


const mapStateToProps = (state, ownProps) => {
    const itemId = ownProps.match.params.itemId
    return {
          item: selectPokemonItem(state, itemId)
      }    
  }
  
  // const mapDispatchToProps = dispatch => {
  //     return { requestPokemonById: (id) => dispatch(requestPokemonById(id)) } 
  // }
  
  export default connect(
      mapStateToProps
  )(ItemDetail)