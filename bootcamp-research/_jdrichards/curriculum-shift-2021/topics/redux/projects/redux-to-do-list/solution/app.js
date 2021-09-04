const {
  store,
  createTask,
  deleteTask,
  resetTaskList,
} = require('./reduxStoreActionReducer');

console.log('Default Redux Store (empty task list):');
console.log(store.getState());
// Default Redux Store (empty task list):
// []

// ---------------------------------------------------

store.dispatch(createTask('walk dog'));
store.dispatch(createTask('feed cat'));
store.dispatch(createTask('talk to bird'));
store.dispatch(createTask('watch goldfish'));

console.log('Redux Store:');
console.log(store.getState());
// Redux Store:
// [ { message: 'walk dog' },
//   { message: 'feed cat' },
//   { message: 'talk to bird' },
//   { message: 'watch goldfish' } ]

// ---------------------------------------------------

store.dispatch(deleteTask(0));
store.dispatch(deleteTask(1));

console.log('Updated Redux Store:');
console.log(store.getState());
// Updated Redux Store:
// [ { message: 'feed cat' },
//   { message: 'watch goldfish' } ]

// ---------------------------------------------------

store.dispatch(resetTaskList());
console.log('Reset Redux Store (empty task list):');
console.log(store.getState());
// Reset Redux Store (empty task list):
// []
