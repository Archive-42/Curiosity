import React from 'react';
import GifsList from './GifsList';
import SearchBar from './SearchBar';

const App = ({ gifUrls, fetchGifs }) => {
  return (
    <>
      <SearchBar fetchGifs={fetchGifs} />
      <GifsList gifUrls={gifUrls} />
    </>
  );
};

export default App;
