import React from 'react';

const GiphyIndexItem = ( { giphy } ) => {
  return (
    <li className='giphy-li'><img src={giphy.images.fixed_height.url} /></li>
  );
}

export default GiphyIndexItem;