export const fetchSearchGiphys = searchTerm => {
  
  const res = $.ajax({
    method: 'GET',
    url: `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=J51nVm6cFhHNmfrt9tuwclgXaI5g7Ru6
&limit=2`
  })
  // debugger
  return res;
}