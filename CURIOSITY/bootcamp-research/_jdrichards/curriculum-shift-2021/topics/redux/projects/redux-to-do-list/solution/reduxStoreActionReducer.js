const { createStore } = require('redux');

const CREATE_TASK = 'CREATE_TASK';
const DELETE_TASK = 'DELETE_TASK';
const RESET_TASK_LIST = 'RESET_TASK_LIST';

// Create a reducer to manage your Redux store

const tasksReducer = (state = [], action) => {
  // debugger
  switch (action.type) {
    case CREATE_TASK:
      const newTask = {
        message: action.taskMessage,
      };
      return [...state, newTask];
    case DELETE_TASK:
      const idx = action.taskId;
      return [...state.slice(0, idx), ...state.slice(idx + 1)];
    case RESET_TASK_LIST:
      return action.emptyTaskList;
    default:
      return state;
  }
};

// Create a Redux store holding the state of your app, managed by the `tasksReducer`.
// You can then interact with the Redux store by using its `subscribe`, `dispatch`, and `getState` methods.

const store = createStore(tasksReducer);

const createTask = (taskMessage) => {
  // debugger
  return {
    type: CREATE_TASK,
    taskMessage,
  };
};

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

module.exports = {
  store,
  createTask,
  deleteTask,
  resetTaskList,
};
