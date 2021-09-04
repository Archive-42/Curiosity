import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function AutoComplete({ names }) {
  const [inputVal, setInputVal] = useState('');

  const handleInput = (e) => {
    setInputVal(e.target.value);
  }

  const selectName = (e) => {
    const name = e.target.innerText;
    setInputVal(name);
  }

  const matches = () => {
    const inputLength = inputVal.length;
    const matches = [];

    if (inputLength === 0) return names;

    names.forEach(name => {
      const nameSegment = name.slice(0, inputLength);
      if (nameSegment.toLowerCase() === inputVal.toLowerCase()) {
        matches.push(name);
      }
    });

    if (matches.length === 0) matches.push('No matches');

    return matches;
  }

  const results = matches().map((result) => (
    <CSSTransition
      key={result}
      classNames="result"
      timeout={{ enter: 500, exit: 300 }}
    >
      <li>{result}</li>
    </CSSTransition>
  ));

  return (
    <section>
      <h1>Autocomplete</h1>
      <div className="auto">
        <input
          onChange={handleInput}
          value={inputVal}
          placeholder="Search..."
        />
        <ul className="auto-dropdown" onClick={selectName}>
          <TransitionGroup>
            {results}
          </TransitionGroup>
        </ul>
      </div>
    </section>
  );
};

export default AutoComplete;
