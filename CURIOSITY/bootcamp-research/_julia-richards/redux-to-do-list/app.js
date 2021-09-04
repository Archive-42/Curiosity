const {
    store,
    createTask,
    deleteTask,
    resetTaskList,
} = require("./reduxStoreActionReducer");

console.log("Default Redux Store (empty task list):");
console.log(store.getState());

store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(createTask("walk dog"));
store.dispatch(createTask("feed cat"));
store.dispatch(createTask("talk to bird"));
store.dispatch(createTask("watch goldfish"));

console.log("Redux Store:");


store.dispatch(deleteTask(0));
store.dispatch(deleteTask(1));

console.log("Updated Redux Store:");


store.dispatch(resetTaskList());

console.log("Reset Redux Store (empty task list):");

