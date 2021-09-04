import { useState, useEffect } from 'react';

const SearchBar = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [windowWidth, setWindowWidth] = useState(0);

  const [background, setBackground] = useState('#67a05c');
  const [placer, setPlacer] = useState();

  const searchForGif = (e) => {
    e.preventDefault();
    props.setSearchQuery(inputValue);
    setInputValue('');
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', logKey);

    function logKey(e) {
      if (
        e.pageX > windowWidth - windowWidth * 0.35 ||
        e.pageX < windowWidth - windowWidth * 0.75
      ) {
        setBackground('#67a05c');

        setPlacer('Search for a GIF!');
      } else {
        setBackground('#f4f488');
        setPlacer('Pic a new GIF already!');
      }
    }

    return () => {
      window.removeEventListener('mousemove', logKey);
    };
  });

  return (
    <div className='searchBar'>
      <form onSubmit={searchForGif}>
        <input
          style={{ background, color: 'black' }}
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placer}
        />
      </form>
    </div>
  );
};

export default SearchBar;
