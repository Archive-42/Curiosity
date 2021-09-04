import { useState, useEffect } from 'react';

const RandomUserFunc = () => {
  const [searchChange, setSearchChange] = useState('');
  const [searchWord, setSearchWord] = useState('foobar');
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('i ran');
    const fetchUser = async () => {
      console.log('fetchuser');
      const res = await fetch(`https://randomuser.me/api/?seed=${searchWord}`);
      const data = await res.json();
      setData(data.results);
    };

    fetchUser();
  }, [searchWord]);

  let renderPerson = data?.map(({ picture, email }) => (
    <div key={email}>
      <img src={picture.large} alt={email} />
      <p>{email}</p>
    </div>
  ));

  return (
    <div>
      <h1>Random User</h1>
      {renderPerson}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearchWord(searchChange);
        }}
      >
        <label htmlFor='search'>Search:</label>
        <input
          onChange={(e) => setSearchChange(e.target.value)}
          value={searchChange}
          name='searchWord'
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default RandomUserFunc;
