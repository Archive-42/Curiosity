import React from 'react';

import GiphysIndex from './giphys_index';

export default class GiphysSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchTerm: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchSearchGiphys(this.state.searchTerm);
  }

  handleChange(e) {
    this.setState( { searchTerm: e.currentTarget.value } );
  }

  handleSubmit(e) {
    e.preventDefault();
    let searchTerm = this.state.searchTerm.split(' ').join('+');
    this.props.fetchSearchGiphys(searchTerm);
    this.state = {searchTerm: ''}
  }

  render() {
    const { giphys } = this.props;
    return (
      <div>
        <form className='search-bar'>
          <input
            onChange={this.handleChange}
            type="text"
            placeholder="Search..."
            value={this.state.searchTerm}/>
          <button type="submit" onClick={this.handleSubmit}>Search</button>
        </form>
        <GiphysIndex giphys={ giphys }/>
      </div>
    )
  }
}