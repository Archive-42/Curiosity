import { useState, useEffect } from 'react';
import { apiBaseUrl, giphyKey } from './config';

const Gif = (props) => {
  const [imgUrl, setImgUrl] = useState('');
  const [checkImg, setCheckImg] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // create a useEffect that sets a reminder timeout where every 10 seconds it checks to see if the user has chosen a new gif. Leave an alert saying 'This alert will show if you do not make a new gif request within 10 seconds' and clear the reminder. It should run after every render

  // Remember to clear the timeout as a cleanup

  // create a useEffect to fetch a GIF based on the search props
  // inside the useEffect create a function fectchGif that does several things asyncronously
  //  1. it should set isLoading state to true
  //  2. it should fetch the GIF using the fetch api with the baseURL from config.js as well as the key
  //  3. if the res returns ok it should do the following:
  //    a. if the word is not in the database,
  //      1) prompt the user that the word isn't in the database and store that new word from the prompt
  //      2)  set the searchQuery prop with a new word
  //    b. if the word is in the datbase
  //      1) set a variable gifUrl with the string url for the GIF
  //      2) set the state with the gifUrl,
  //      3) set isLoading to false
  //  4. invoke the function
  // the useEffect should run when one of the props changes

  if (isLoading) {
    return <h1>Searching for gif...</h1>;
  }

  return <img src={`${imgUrl}`} alt='gif' />;
};

export default Gif;
