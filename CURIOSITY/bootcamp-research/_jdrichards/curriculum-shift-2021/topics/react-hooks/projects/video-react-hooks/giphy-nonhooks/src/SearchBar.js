import React from 'react';
import { GifContext } from './GifContext';

class SearchBar extends React.Component {
  static contextType = GifContext;
  
  constructor() {
    super();
    this.state = {
      inputValue: '',
    };
  };

  updateInputVal = e => {
    this.setState({ inputValue: e.target.value });
  };

  searchForGif = e => {
    e.preventDefault();
    this.context.setSearchQuery(this.state.inputValue);
  };
  
  render() {
    return (
      <form onSubmit={this.searchForGif}>
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.updateInputVal}
          placeholder="Search for a GIF!"
        />
      </form>
    );
  }
}

export default SearchBar;
