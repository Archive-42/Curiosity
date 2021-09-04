import React from 'react';

const GifsList = ({ urls }) => (
  <div>
    {urls.map((url, i) => (
      <img key={i} src={url} alt="gif" />
    ))}
  </div>
);

export default GifsList;
