import { useState, useEffect } from 'react';
import Gif from './Gif';
import SearchBar from './SearchBar';

const App = () => {
  //create a searchQuery that checks local storage 'myGiphy' or use 'snowboard as the default search

  // pass both searchQuery and setSearchQuery to the Gif Component
  // pass setSearchQuery to Searchbar component
  // create a useEffect that stores the search in 'myGiphy' key in localstorage

  return (
    <main className='card'>
      <h1>Giphy</h1>
      <Gif />
      <div className='knobs'>
        <span className='circle' />
        <span className='circle' />
      </div>
      <SearchBar />
    </main>
  );
};

export default App;
