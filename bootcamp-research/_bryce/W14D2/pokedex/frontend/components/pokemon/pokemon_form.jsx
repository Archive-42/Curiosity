import React from 'react';
import { withRouter } from 'react-router-dom';

class PokemonForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      image_url: "",
      poke_type: "bug",
      attack: "",
      defense: "",
      moves: ['', '']
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.update = this.update.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    const pokemon = this.state
    this.props.createPokemon(pokemon).then(newPokemon => {
      debugger
      this.props.history.push(`pokemon/${newPokemon.pokemon.id}`);
    });
  }

  errors(){
    const errors = this.props.errors

    const lisOfErrors = errors.map( (error,idx) => {
      return <li key={idx}>{error}</li>
    })

    return (<ul className="errors-list">{lisOfErrors}</ul>)
  }

  update(field) {
    return e => {
      this.setState({ 
        [field]: e.target.value
      })
    }
  }

  updateMoves(index) {
    return e => {
      const moves = this.state.moves
      moves[index] = e.target.value
      this.setState({
        moves
      })
    }
  }

  render () {
    const errors = (this.props.errors) ? this.errors() : null 
    return (
      <div className="pokemon-form-container">
      <img src="/assets/pokemon-logo.svg"></img>
        {errors}
        <form action="" onSubmit={this.handleSubmit} className="pokemon-form">
            <input onChange={this.update('name')} type="text" value={this.state.name} placeholder="Name"/>
            <input onChange={this.update('image_url')} type="text" value={this.state.image_url} placeholder="Image Url"/>
            <select onChange={this.update('poke_type')} value={this.state.poke_type}>
              <option value="bug" >bug</option>
              <option value="dragon">dragon</option>
              <option value="electric">electric</option>
              <option value="fighting">fighting</option>
              <option value="fire">fire</option>
              <option value="flying">flying</option>
              <option value="ghost">ghost</option>
              <option value="grass">grass</option>
              <option value="ground">ground</option>
              <option value="ice">ice</option>
              <option value="normal">normal</option>
              <option value="poison">poison</option>
              <option value="psychic">psychic</option>
              <option value="rock">rock</option>
              <option value="steel">steel</option>
              <option value="water">water</option>
            </select>
            <input onChange={this.update('attack')} type="number" value={this.state.attack} placeholder="Attack"/>
            <input onChange={this.update('defense')} type="number" value={this.state.defense} placeholder="Defense"/>
            <input onChange={this.updateMoves(0)} type="text" value={this.state.moves[0]} placeholder="Move 1"/>
            <input onChange={this.updateMoves(1)} type="text" value={this.state.moves[1]} placeholder="Move 2"/>

          <input type="submit" value="Create Pokemon" className="create-pokemon-button"/>
        </form>
      </div>
    )
  }


}

export default withRouter(PokemonForm);
// export default PokemonForm;