import { useState, useEffect } from 'react';

const SearchBar = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [background, setBackground] = useState('#67a05c');
  const [placer, setPlacer] = useState('');

  // create a function searchForGif that takes the event, stops the default and then calls the setSearchQuery
  // passing it the input Value
  // clear the input Value
  const searchForGif = (e) => {
    e.preventDefault();
    props.setSearchQuery(inputValue);
    setInputValue('');
  };

  // add a useEffect to listen to the mousemoves on the window and use a function 'logKey' to react accordingly.
  // logKey function will track the location of the mouse on the page and if the Y page coordinates for Y are greater
  // than 200 and less then 650 the background state should be updated with a new string color #f4f488 and set the placeholder variable to
  // say 'Pick a new GIF already!'
  // otherwise the background should be set to #67a05c and the placeholder should say 'Search for a GIF'
  // placeholders should receive their value from the placer slice of state.
  // remember to cleanup that event listener
  // value attribute on input should take its value from the inputValue
  // input should have an onChange event listener that calls the sets the inputValue with the target value of the event
  // background css for the style attribute on input should be added with the background slice of state
  return (
    <div className='searchBar'>
      <form onSubmit={searchForGif}>
        <input style={{ color: 'black' }} type='text' />
      </form>
    </div>
  );
};

export default SearchBar;
