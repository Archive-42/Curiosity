import React, { useState } from "react";

const SearchBar = ({ fetchGifs }) => {
  const [inputValue, setInputValue] = useState('');

  const updateInputVal = e => {
    setInputValue(e.target.value);
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    fetchGifs(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={updateInputVal}
        placeholder="Search for a GIF!"
      />
    </form>
  );
};

export default SearchBar;
