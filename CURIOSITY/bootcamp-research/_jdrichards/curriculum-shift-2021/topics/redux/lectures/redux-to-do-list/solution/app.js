const {
  store,
  createTask,
  deleteTask,
  resetTaskList,
} = require('./reduxSAR');

console.log('Default Redux Store (empty task list):');
console.log(store.getState());

// store.dispatch(createTask('walk dog'));
// store.dispatch(createTask('feed cat'));
// store.dispatch(createTask('talk to bird'));
// store.dispatch(createTask('watch goldfish'));

// console.log('Redux Store:');
// console.log(store.getState());

// store.dispatch(deleteTask(0));
// store.dispatch(deleteTask(1));

// console.log('Updated Redux Store:');
// console.log(store.getState());

// store.dispatch(resetTaskList());
// console.log('Reset Redux Store (empty task list):');
// console.log(store.getState());

store.subscribe(() => console.log(store.getState()));

console.log('-----');
store.dispatch(createTask('walk dog'));
store.dispatch(createTask('feed cat'));
store.dispatch(createTask('talk to bird'));
store.dispatch(createTask('watch goldfish'));

console.log('-----');
store.dispatch(deleteTask(0));
store.dispatch(deleteTask(1));

console.log('-----');
store.dispatch(resetTaskList());
