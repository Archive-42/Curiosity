import { useState, useEffect } from 'react';
import { apiBaseUrl, giphyKey } from './config';

const Gif = (props) => {
  const [imgUrl, setImgUrl] = useState('');
  const [checkImg, setCheckImg] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const reminder = setTimeout(() => {
  //     if (checkImg === props.searchQuery) {
  //       alert('Pick another GIF Hotshot!');
  //       clearTimeout(reminder);
  //     }
  //   }, 10000);

  //   return () => clearTimeout(reminder);
  // });

  useEffect(() => {
    const fetchGif = async () => {
      console.log(props.searchQuery);
      setIsLoading(true);
      const res = await fetch(
        `${apiBaseUrl}${props.searchQuery}&api_key=${giphyKey}`
      );
      if (res.ok) {
        const giphyRes = await res.json();
        if (!giphyRes.data.length) {
          const newWord = prompt(
            'That word is not in our database. Please enter another word:'
          );
          props.setSearchQuery(newWord);
        } else {
          const gifUrl = giphyRes.data[0].images.fixed_width.url;
          setImgUrl(gifUrl);
          setCheckImg(props.searchQuery);
          setIsLoading(false);
        }
      }
    };
    fetchGif();
  }, [props]);

  if (isLoading) {
    return <h1>Searching for gif...</h1>;
  }

  return <img src={`${imgUrl}`} alt='gif' />;
};

export default Gif;
