const {
    store,
    createTask,
    deleteTask,
    resetTaskList,
} = require("./reduxStoreActionReducer");

console.log("Default Redux Store (empty task list):");
console.log(store.getState());

store.subscribe(() => console.log(store.getState()));

console.log("Task creation actions");
store.dispatch(createTask("walk dog"));
store.dispatch(createTask("feed cat"));
store.dispatch(createTask("talk to bird"));
store.dispatch(createTask("watch goldfish"));

console.log("Task deletion actions");
store.dispatch(deleteTask(0));
store.dispatch(deleteTask(1));

console.log("Task reset action");
store.dispatch(resetTaskList());
