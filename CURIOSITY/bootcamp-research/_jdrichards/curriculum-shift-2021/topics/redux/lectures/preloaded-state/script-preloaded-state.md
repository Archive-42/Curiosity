
# Preloaded State

[slides]

<slide1>

<start with the app running and displayed in the browser>

Hi there! This is James.

I just finished integrating Redux into the Fruit Stand React application, but
whenever the app is reloaded in the browser, all of the state data is lost.

<demo loosing data>

In this video, I'll use the combination of Redux's ability to create a store
with preloaded state with the browser's local storage to persist store state
across page reloads.

<switch to vs code> In the `store.js` file, the Redux store is being initialized
with no initial state. I can define some data and pass it to the `createStore`
method using the `preloadedState` argument...

```js
const preloadedState = [
  'APPLE',
  'ORANGE',
];

const store = createStore(rootReducer, preloadedState);
```

A couple of things to note about preloading state... `preloadedState` must match
the state shape that's expected by the store's reducer... also, `preloadedState`
is not the same as default state... default state should always be set in the
reducer...

To persist the Redux store's state across page reloads, I'll start with creating
a set of local storage helper functions...

```js
// localStorage.js

const STATE_KEY = 'fruitstand';

export const loadState = () => {
  try {
    const stateJSON = localStorage.getItem(STATE_KEY);
    if (stateJSON === null) {
      return undefined;
    }
    return JSON.parse(stateJSON);
  } catch (err) {
    console.warn(err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const stateJSON = JSON.stringify(state);
    localStorage.setItem(STATE_KEY, stateJSON);
  } catch (err) {
    console.warn(err);
  }
};
```

To ensure that the persisted state in local storage doesn't get out of sync with
the store, I want to persist the state whenever it's updated. I know that the
store's reducer is called whenever there's an action dispatched to update the
state, so I might be tempted to update the reducer like this...

```js
import {
  ADD_FRUIT,
  ADD_FRUITS,
  SELL_FRUIT,
  SELL_OUT,
} from '../actions/fruitActions';
import { saveState } from '../localStorage';

const fruitReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_FRUIT:
      const nextState = [...state, action.fruit];
      saveState(nextState);  // Persist state data to local storage
      return nextState;

    // Case clauses removed for brevity.

    default:
      return state;
  }
};

export default fruitReducer;
```

But I don't want to do this! Per the official Redux docs, reducers should stay
pure and not cause side effects like calling APIs or persisting data to local
storage.

To keep my reducer pure, I can handle persisting state to local storage in the
module where I create the store by subscribing to listen for state changes...

```js
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import { saveState } from './localStorage';

const store = createStore(rootReducer);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
```

Now whenever the store's state is updated, the `store.getState` method is called
to get and pass the current state to the `saveState` method...

Now I can load state from local storage and pass it to the `createStore` method
as preloaded state...

```js
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import { loadState, saveState } from './localStorage';

const preloadedState = loadState();

const store = createStore(rootReducer, preloadedState);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
```

With these updates in place, the Redux store's state will persist across page
reloads...

Test the app...

And that's it for this video! If you'd like to review the application shown in
this video, be sure to check out the redux-fruit-stand-examples repo. <show repo
in the browser>

Thanks for watching and I'll see you next time!

[slides]: https://docs.google.com/presentation/d/1X7ms1M_ywQp7KN_oZzItxb26ihORyNyhQQWlfgX0caM/edit#
