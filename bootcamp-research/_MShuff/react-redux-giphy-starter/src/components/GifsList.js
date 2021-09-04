import React from 'react';

// TODO: Take in an destructure the `urls` prop
const GifsList = ({ gifUrls }) => (
  // TODO: Render a `<div>` as the parent element of your `GifsList` component.
  // TODO: Map over your `urls` array to render an `<img>` for each `url`.
  <div>
    {gifUrls.map((url, idx) => <img src={url} key={idx} />)}
  </div>
);

export default GifsList;
