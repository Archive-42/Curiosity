import React, { useState, useContext } from 'react';
import { GifContext } from './GifContext';

const SearchBar = () => {
  const context = useContext(GifContext);
  const [inputValue, setInputValue] = useState('');

  const updateInputVal = e => {
    setInputValue(e.target.value);
  };

  const searchForGif = e => {
    e.preventDefault();
    context.setSearchQuery(inputValue);
  };

  return (
    <form onSubmit={searchForGif}>
      <input
        type="text"
        value={inputValue}
        onChange={updateInputVal}
        placeholder="Search for a GIF!"
      />
    </form>
  );
}

export default SearchBar;
