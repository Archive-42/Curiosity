import React from 'react';
import GifsList from './GifsList';
import SearchBar from './SearchBar';

const App = ({ fetchGifs, gifUrls }) => {
  console.log(gifUrls);
  return (
    <>
      <SearchBar fetchGifs={fetchGifs} />
      <GifsList gifUrls={gifUrls}/>
    </>
  );
};

export default App;
