import React, { useState, useEffect, useContext } from 'react';
import { apiBaseUrl } from './config';
import { GifContext } from './GifContext';

const Gif = () => {
  const context = useContext(GifContext);
  const [imgUrl, setImgUrl] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGif = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}&q=${context.searchQuery}`);
        
        if (!res.ok) throw (res);
        const giphyRes = await res.json();
        const gifUrl = giphyRes.data[0].images.fixed_width.url;
        
        setImgUrl(gifUrl);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGif();
  }, [context.searchQuery]);

  if (isLoading) {
    return <h1>Searching for gif...</h1>;
  }

  return <img src={`${imgUrl}`} alt="gif" />;
};

export default Gif;
