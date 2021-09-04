import React from 'react';

// TODO: Take in an destructure the `urls` prop
const GifsList = ({ gifUrls }) => {
  // TODO: Render a `<div>` as the parent element of your `GifsList` component.
  // TODO: Map over your `urls` array to render an `<img>` for each `url`.

  console.log(gifUrls)
  return (
    <>
      <div>
        {gifUrls.map((gif) => {
          console.log(gif)
          return (
            <img src={gif} alt={gif} />
          )
        })}
      </div>
    </>
  )
};

export default GifsList;
