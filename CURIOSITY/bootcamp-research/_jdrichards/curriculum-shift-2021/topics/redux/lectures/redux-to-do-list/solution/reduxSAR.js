const { createStore } = require('redux');

const CREATE_TASK = 'CREATE_TASK';
const DELETE_TASK = 'DELETE_TASK';
const RESET_TASK_LIST = 'RESET_TASK_LIST';

const tasksReducer = (state = [], action) => {
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

const store = createStore(tasksReducer);

const createTask = (taskMessage) => {
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
