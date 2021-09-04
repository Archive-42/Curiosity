/******************************************************************************
 3. Use the fetch API to make Promise-based API calls
*******************************************************************************/
const fetch = require('node-fetch');

fetch(`https://swapi.dev/api/people/1`)
  .then((res) => res.json())
  .then((person) => console.log(person));

// fetch(`https://swapi.dev/api/people/1`)
//   .then((res) => {
//     return res.json();
//   })
//   .then(console.log);
