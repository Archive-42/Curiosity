import React, { useState } from 'react';
import { GifContext } from './GifContext';
import Gif from './Gif';
import SearchBar from './SearchBar';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('hello');

  return (
    <GifContext.Provider value={{ searchQuery, setSearchQuery }}>
      <Gif />
      <SearchBar />
    </GifContext.Provider>
  );
};

export default App;
