
# Video: Redux To-do List Project Debrief

Redux is a highly conceptual library to pick up, and when learning anything new
practice always makes perfect! In this video, we will debrief and walk-through
the Redux To-do List project. We will code a full Redux cycle and use the Redux
store's `dispatch`, `getState`, and `subscribe` methods to interact with the
store's current state. At the end of the video, we will use the VS Code debugger
to go over our Redux cycle code, step-by-step.

Let's start by setting up the project and generating a Redux `store` by using
the `createStore` method from the Redux library! We'll create a new project
directory:

```sh
mkdir redux-todos
```

And change into the directory to initialize a new project and install `redux` as
a project dependency:

```sh
cd redux-todos
npm init -y && npm install redux
```

Our project will have two files: `reduxSAR.js` and `app.js`. First we'll set up
our Redux store, actions, and reducer in `reduxSAR.js`, then we'll write code in
`app.js` to interact with the Redux store and test the dispatching of our
actions.

In `reduxSAR.js`, import the `createStore` method from Redux. We'll use CommonJS
module syntax so that we can run the project within the Node environment:

```js
const { createStore } = require('redux');
```

-----

We'll use the `createStore` method to generate the Redux store. As a reminder,
the `createStore` method takes in a reducer that helps manage the store's state.
You'll only ever have **one** Redux store in any given project - unlike when
using Context, where you can use multiple context objects for state management:

```js
const store = createStore(tasksReducer);
```

We'll also set up a reducer function for our application. As a reminder, a
reducer is simply a function that helps manage the Redux store by routing
actions based on their `type` attribute. It returns the next Redux store state
tree after being given the current state tree and an action to handle.

The `tasksReducer` function will take in the Redux store's current `state` and
an `action` as parameters. You should always set a default state. For our
application today, we'll set the default `state` to an empty array:

```js
const tasksReducer = (state = [], action) => {

};

const store = createStore(tasksReducer);
```

-----

As you learn more about Redux, you'll learn that deciding how to shape your
state data is an important aspect of state-management. Without going into all of
the reasons at this point, it's generally best practice to use an object to
structure your state data. As you gain more experience with using Redux, you'll
better understand the nuances between deciding to use an object or an array for
storing state. Since we don't have a UI, we'll use an array in this example to
make it simpler to delete tasks.

As a reminder, a reducer function helps manage the Redux store by routing
actions based on their `type` attribute. We'll use a `switch` statement on the
action's `type` to determine what happens when actions of different types are
dispatched! The `switch` statement should return the current `state` by default:

```js
const tasksReducer = (state = [], action) => {
  switch (action.type) {

    default:
      return state;
  }
};
```

Now let's set up the switch `case` in our reducer for each action type. We'll
have three types of task actions: creating a task, deleting a task, and
resetting the task list. Let's set up the action types with constants to make
sure typos in the reducer's `case` statements throw an error.

```js
const CREATE_TASK = 'CREATE_TASK';
const DELETE_TASK = 'DELETE_TASK';
const RESET_TASK_LIST = 'RESET_TASK_LIST';

const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_TASK:

    case DELETE_TASK:

    case RESET_TASK_LIST:

    default:
      return state;
  }
};
```

-----

Before we move on, let's plan the shape of our action objects that our reducer
will be working with. We want our action object for creating a task to list its
`type` as `CREATE_TASK` and have a payload key of `taskMessage` to a string
with the task description, for example `walk dog`.

```js
{
  type: 'CREATE_TASK',
  taskMessage: 'walk dog',
}
```

In case you're hazy about what term "payload" means, you can check out the
[Webster dictionary definition]: "the load carried by a vehicle exclusive of
what is necessary for its operation". The `taskMessage` is necessary to perform
the task creation operation. This is one of many instances where you can trace
origin of coding jargon to terminology of other industries. You can also connect
the concept of a Redux action payload to an HTTP request body!

-----

We'll define a function named `createTask`. This function will be an action
creator function that takes in a `taskMessage` about the task description as a
parameter and returns our `CREATE_TASK` object.

```js
const createTask = (taskMessage) => {
  return {
    type: 'CREATE_TASK',
    taskMessage,
  };
};
```

Now let's set up the shape of the `DELETE_TASK` and `RESET_TASK_LIST` actions,
and define their associated action creator functions.

```js
const deleteTask = (taskId) => {
  return {
    type: DELETE_TASK,
    taskId,
  };
};

const resetTaskList = () => {
  return {
    type: RESET_TASK_LIST,
    emptyTaskList: [],
  };
};
```

-----

The reducer function is called every time an action is dispatched. This means
that the `tasksReducer` function will be invoked whenever one of our task
actions is dispatched. It's now time to finish our `tasksReducer` function and
write code to handle each specific action type. We'll set up a `newTask` object
based on the action's `taskMessage` payload:

```js
case CREATE_TASK:
  const newTask = {
    message: action.taskMessage,
  };
```

As a reminder, the Redux store's state should be immutable, this means we
shouldn't `push` the `newTask` directly into the `state` array. We'll use spread
syntax to return an updated state with `newTask` set as the last array element
in a new array:

```js
case CREATE_TASK:
  const newTask = {
    message: action.taskMessage,
  };
  return [...state, newTask];
```

-----

We'll take care of the `DELETE_TASK` case. The `deleteTask` action creator
function takes in a `taskId` that actually references a task's positional index
in the `state` array. In the project, you used the index and the `Array.slice`
method to return a copy of the state that excludes the task to delete. In this
project walkthrough, we'll use one of the other [immutable update patterns] from
the Redux documentation. Since the `slice` method is not mutative, we can use it
to make a copy of the state. Then we can use the `splice` method to safely
mutate the copy and remove the task to delete.

```js
case DELETE_TASK:
  const idx = action.taskId;
  const newState = array.slice();
  newState.splice(idx, 1);
  return newState;
```

-----

Now let's define what happens when a `RESET_TASK_LIST` action is dispatched.
Currently, the action has an `emptyTaskList` payload that is an empty array.
Let's do some refactoring and dispatch a `RESET_TASK_LIST` action without an
`emptyTaskList` payload. Then in the reducer's `case` statement for the
`RESET_TASK_LIST` action, we can simply return an empty array:

```js
const resetTaskList = () => {
  return {
    type: RESET_TASK_LIST,
  };
};
```

```js
case RESET_TASK_LIST:
  return [];
```

-----

Cool, we've just finished setting up a Redux store, some basic actions, and a
reducer. We can do some testing in our `app.js` file. We'll export the `store`,
`createTask`, `deleteTask`, and `resetTaskList` from the `reduxSAR.js` file and
require them in our `app.js` file:

```js
module.exports = {
  store,
  createTask,
  deleteTask,
  resetTaskList,
};
```

```js
const {
  store,
  createTask,
  deleteTask,
  resetTaskList,
} = require('./reduxSAR');
```

Now it's time for us to use the `store.getState` method to access the data
stored in the Redux store, the `store.dispatch` method to dispatch actions, and
the `store.subscribe` method to subscribe to Redux store changes.

We'll set up a way to view the default Redux store state, an empty task list:

```js
console.log('Default Redux Store (empty task list):');
console.log(store.getState());
```

We'll run our Node app:

```sh
node app.js
```

And voilà, we have our default Redux store, empty task list!

-----

We'll dispatch some actions and see how the dispatched actions change our Redux
store's state:

```js
store.dispatch(createTask('walk dog'));
store.dispatch(createTask('feed cat'));
store.dispatch(createTask('talk to bird'));

console.log('Redux Store:');
console.log(store.getState());

store.dispatch(deleteTask(0));
store.dispatch(deleteTask(1));

console.log('Updated Redux Store:');
console.log(store.getState());

store.dispatch(resetTaskList());
console.log('Reset Redux Store (empty task list):');
console.log(store.getState());
```

Now instead of having multiple console log statements to log the store's current
state, we'll refactor our code to have the store subscribe to changes. We'll
invoke the `store.subscribe` method with a callback that logs the state anytime
the store is updated, or in other words anytime an action is dispatched. We'll
console log a line between all the different types of dispatch calls, so we can
more easily read our logs.

```js
const {
  store,
  createTask,
  deleteTask,
  resetTaskList,
} = require('./reduxStoreActionReducer');

console.log('Default Redux Store (empty task list):');
console.log(store.getState());

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
```

-----

Let's run our application (`node app.js`). Notice how we have the same number of
state logs as the number of dispatch calls we have. These are the logs for the
four `CREATE_TASK` dispatch calls, these are the logs for the two `DELETE_TASK`
dispatch calls, and this is the log for the `RESET_TASK_LIST` dispatch call.

-----

Now let's investigate and follow the Redux store cycle with a `debugger`. We'll
have VS Code generate the `.vscode` directory and the `launch.json` file for us.
Then we'll set breakpoints with the `debugger` statement in our `createTask`
action creator and the `CREATE_TASK` case statement.

```js
case CREATE_TASK:
  debugger
  const newTask = {
    message: action.taskMessage,
  };
  return [...state, newTask];
```

```js
const createTask = (taskMessage) => {
  debugger
  return {
    type: CREATE_TASK,
    taskMessage,
  };
};
```

-----

If we open `app.js` as the active file in your VS Code workspace, press `F5`,
and select `Node.js` as our environment - VS Code will run our Node app in debug
mode. 

Let's step through to follow the Redux cycle.

1. We see that the `createTask` action creator function is invoked with the
   string `walk dog`.
2. Then the `createTask` function returns the action with a `type` of
   `CREATE_TASK` and `taskMessage` of `'walk dog'`.
3. The `store.dispatch` method is then invoked to dispatch the action and invoke
   the `tasksReducer` function, bringing us into our `CREATE_TASK` case
   statement.
4. Lastly, the store's state is updated to be the new state returned by the
   reducer.

We'll step through a few more times until all of our dispatched actions have
gone through the Redux cycle. Great! Hope you enjoyed learning about Redux and
creating your first Redux store, actions, and reducer today! You'll continue
learning about the popular practice of integrating Redux into React and practice
debugging Redux code with `console.log` and `debugger` statements!

[immutable update patterns]: https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns#inserting-and-removing-items-in-arrays
[Webster dictionary definition]: https://www.merriam-webster.com/dictionary/payload
