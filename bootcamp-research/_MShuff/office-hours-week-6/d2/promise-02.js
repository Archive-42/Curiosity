/******************************************************************************
 2. Use Promises to write more maintainable asynchronous code
*******************************************************************************/
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// wait 2 seconds, and then console.log we're done
wait(2000)
  .then(() => console.log('Done waiting with .then'))
  .then(() => asyncWaitAndLog());

async function asyncWaitAndLog() {
  await wait(2000);
  console.log('The async waiting is over!');
}
