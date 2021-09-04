- This project precedes context. So... we are just passing props for both the searchQuery and setSearchQuery.

- app.js should set the searchQuery state using localstorage or a keyword like 'snowbaord'

- props should be passed to Gif component for searchQuery and setSearchQuery

- props should be passed to searchBar for setSearchQuery

- GIF component will have 3 useEffects

1.  set localstorage
2.  set reminder setTimeout
3.  set fetch to giphy api

- localStorage will store the searchQuery so that when you reload the page it loads the last query

- timeout will remind the user after 10 seconds to make a new search choice

- fetch will take the searchQueary and use the giphy api to search for the gif

- searchbar component
  1. set up state
  2. create searchForGif function
  3. use effect for scroll
  4. cleanup event listener
  5. background of input box should change based on the location of the pointer in the window
  6. when pointer enters the card, the input changes color
