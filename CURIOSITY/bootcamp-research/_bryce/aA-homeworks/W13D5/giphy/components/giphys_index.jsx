import React from 'react';

import GiphysIndexItem from './giphys_index_item';

const GiphysIndex = ( { giphys }) => {
  const giphyItems = giphys.map(giphy =>
    <GiphysIndexItem key={ giphy.id } giphy={ giphy } />);
  return (
    <ul>
      {giphyItems}
    </ul>
  );
}

export default GiphysIndex;