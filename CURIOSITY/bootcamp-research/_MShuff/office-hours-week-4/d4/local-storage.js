document.addEventListener('DOMContentLoaded', () => {
  /***************************************************************************
      #02 - Construct JavaScript to add, modify, and remove data in localStorage using the Web Storage API.
     **************************************************************************/
  // storing items in local storage
  let key = 'TAs';
  let value = ['Dillon', 'Kristen', 'Michael', 'Senyo'];
  // must serialize value before storing in local storage
  let serializedValue = JSON.stringify(value);
  sessionStorage.setItem(key, serializedValue);

  // not going to work
  // console.log(JSON.parse("<h2>gobeldygoop</h2>"));

  /***************************************************************************
      #03 - Add, modify, and remove data in localStorage with key-value pairs
     **************************************************************************/
  // retrieving items from local storage
  let instructors = sessionStorage.getItem(key); // ["Dillon", "Kristen", "Michael", "Senyo"];
  console.log('instructors : ', instructors);
  console.log('typeof instructors: ', typeof instructors); // string

  // deserializing values retrieved from local storage
  let deserializedInstructors = JSON.parse(instructors);
  console.log('deserializedInstructors: ', deserializedInstructors);
  console.log(
    'typeof deserializedInstructors: ',
    typeof deserializedInstructors
  ); // object

  let val = sessionStorage.getItem('banana');
  console.log(val); // null

  // this wont work because instructors is JSON str not a JS obj
  // instructors.forEach((ta) => console.log(ta));

  // this will work because deserializedInstructors is now a JS obj
  // deserializedInstructors.forEach((ta) => console.log(ta));
});
