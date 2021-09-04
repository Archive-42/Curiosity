/******************************************************************************
 1. Instantiate a Promise object
*******************************************************************************/
const myPromise = new Promise((resolve, reject) => {
  const random = Math.floor(Math.random() * 100); // # between 0-100
  setTimeout(() => {
    if (random > 50) {
      resolve('foo');
    } else {
      reject('barrrr');
    }
  }, 1000);
});

// myPromise.then(console.log);
myPromise
  .then((resolve) => console.log(resolve))
  .catch((reject) => console.log(reject));
