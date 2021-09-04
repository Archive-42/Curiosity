import React from 'react';
import { GifContext } from './GifContext';
import Gif from './Gif';
import SearchBar from './SearchBar';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: '',
      setSearchQuery: this.setSearchQuery,
    };
  }

  setSearchQuery = inputValue => {
    this.setState({ searchQuery: inputValue });
  }

  render() {
    return (
      <GifContext.Provider value={this.state}>
        <Gif />
        <SearchBar />
      </GifContext.Provider>
    );
  }
};

export default App;
