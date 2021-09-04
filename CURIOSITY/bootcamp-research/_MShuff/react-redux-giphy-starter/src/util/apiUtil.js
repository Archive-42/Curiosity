import { apiKey } from '../config';

// TODO: Define and export a `fetchGifs` function to fetch from the Giphy API
export const fetchGifs = searchTerm => (
  // TODO: Write a fetch call to the Giphy API's search endpoi
  fetch(`http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=3`)
);
