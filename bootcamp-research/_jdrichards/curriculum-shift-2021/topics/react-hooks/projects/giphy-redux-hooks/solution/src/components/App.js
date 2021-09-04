import React from 'react';
import GifsList from './GifsList';
import SearchBar from './SearchBar';

const App = ({ gifs, fetchGifs }) => {
  const urls = gifs.map(gif => gif.images.fixed_height.url);

  return (
    <>
      <SearchBar fetchGifs={fetchGifs} />
      <GifsList urls={urls} />
    </>
  );
};

export default App;
