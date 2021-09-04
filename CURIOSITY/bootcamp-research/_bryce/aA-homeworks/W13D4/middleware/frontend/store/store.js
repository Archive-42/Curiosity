import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import rootReducer from '../reducers/root_reducer';

const configureStore = (preloadedState = {}) => {
  const store = createStore(rootReducer, preloadedState, applyMiddleware(friendlyGreeting, addLoggingToDispatch));
  store.subscribe(() => {
    localStorage.state = JSON.stringify(store.getState());
  });
  return store;
}

const addLoggingToDispatch = store => next => action => {
  console.log(store.getState());
  console.log(action);
  next(action);
  console.log(store.getState());
}

const friendlyGreeting = store => next => action => {
  console.log(`Hello from the friendlyGreeting middleware!`);
  console.log(`About to do your action: ${action.type}`);
  console.log('Bye now!');
  next(action);
  console.log('The action is done now. Goodbye for real!');
}

export default configureStore;
