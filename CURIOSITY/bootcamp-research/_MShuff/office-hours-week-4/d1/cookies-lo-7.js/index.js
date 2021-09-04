// Let's look at cookies in the console
console.log(document.cookie);

// // Create a cookie
// document.cookie = `firstName=Michael`;
// console.log(document.cookie); // firstName=Michael
// document.cookie = `lastName=Shuff`;
// console.log(document.cookie); // firstName=Michael; lastName=Shuff
// document.cookie = `age=33`;
// console.log(document.cookie); // firstName=Michael; lastName=Shuff; age=33

// // Split a cookie
// let cookiePairs = document.cookie.split('; ');
// console.log(cookiePairs); // ["firstName=Michael", "lastName=Shuff", "age=33"]

// // Delete a cookie
// document.cookie = 'age=; expires = Thu, 01 Jan 1970 00:00:00 GMT';
// console.log(document.cookie); // // firstName=Michael; lastName=Shuff

// let keys = [];
// let values = [];
// function storeCookiesAndClear() {
//   // Grab our cookie list
//   let cookies = document.cookie.split('; ');

//   // Loop through array, and split each at the '='
//   for (let cookie of cookies) {
//     // Each cookie needs split into a key, value
//     console.log('cookie', cookie);
//     // Using destructuring
//     let [key, value] = cookie.split('=');
//     // Same effect
//     // let key = cookie.split('=')[0];
//     // let value = cookie.split('=')[1];
//     console.log(`Storing cookie ${key} and it's value: ${value}`);
//     // Push up separated key value pair
//     keys.push(key);
//     values.push(value);
//   }

//   // Loop through key/value pairs together
//   for (let i = 0; i < keys.length; i++) {
//     console.log(`${keys[i]}: ${values[i]}`);
//   }
// }
// storeCookiesAndClear();

// // Delete All Cookies with window.confirm() and static constants
// // Const's in caps are used for constants with a static value that really won't ever change
// const EXPIRE_DATE = 'expires = Thu, 01 Jan 1970 00:00:00 GMT';
// // Clear out the cookies from the browser
// if (window.confirm('Delete all your cookies?')) {
//   for (let key of keys) {
//     // delete cookie
//     console.log(key);
//     document.cookie = `${key}=; ${EXPIRE_DATE}`;
//   }
// }
