
# Thunks

One of the most common problems you need middleware to solve is asynchronicity.
When building web applications that interact with a server, you'll need to
request resources and then dispatch the response to your store when it
eventually gets back.

While it's possible to make these API calls from your components and dispatch
synchronously on success, for consistency and reusability it's preferable to
have the source of every change to our application state be an action creator.
Thunks are a new kind of action creator that will allow you to do that.

When you finish this article, you should be able to write a thunk action creator
to make an asynchronous request to an API and dispatch an action when the
response is received.

## Looking at how thunks work

Rather than returning a plain object, a **thunk action creator** returns a
function. This function, when called with an argument of `dispatch`, can then
dispatch one or more actions, immediately, or later. Here's an example:

```js
const thunkActionCreator = () => dispatch => {
  dispatch({
    type: 'RECEIVE_MESSAGE',
    message: 'This will be dispatched immediately.'
  });

  setTimeout(() => dispatch({
    type: 'RECEIVE_MESSAGE',
    message: 'This will be dispatched 1 second later.'
  }, 1000));
}
```

This is great, but without custom middleware it will break as soon as the
function action hits your reducer because only POJO (Plain-Old JavaScript)
objects with a key of `type` can be passed into the reducer as actions. You need
middleware to intercept all actions of type `function` before it gets to the
reducer. Instead of passing the function action into the reducer, it will invoke
it with the Redux store's `dispatch` and `getState` methods.

This middleware is called a **`thunk` middleware**. It intercepts **thunk
actions**, or functions that have been dispatched. Here's an example of a
`thunk` middleware.

```js
const thunk = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }
  return next(action);
};

export default thunk;
```

Instead of defining your own thunk middleware, you can use the one from the
`redux-thunk` package.

## Applying the thunk middleware

To apply the `thunk` middleware into the store, you can use the
`applyMiddleware` function from `redux` and use it as a store enhancer when
creating the store.

Here's an example:

```js
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const configureStore = (preloadedState = {}) => {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, logger),
  );
};

export default configureStore;
```

Notice how the `thunk` middleware is applied **before** the `logger` middleware.
This is necessary because the `thunk` middleware should intercept all thunk
actions from going to the `logger` middleware since `logger` only prints out
regular POJO actions.

## Thunk action creators

A regular POJO action creator is a function that returns a POJO (Plain-Old
JavaScript Object) with a `type` key. A thunk action creator is a function that
returns a thunk function. A thunk function is a function that is invoked by the
thunk middleware and gets passed the `dispatch` and `getState` store methods.

Inside of the thunk function, an asynchronous call is made. After the async
call is done, a regular POJO action may be dispatched.

Here's an example of a thunk action creator dispatching a regular POJO action:

```js
export const RECEIVE_FRUITS = 'RECEIVE_FRUITS';

export const fetchFruits = () => async (dispatch) => {
  const res = await fetch(`/fruits`); // get the fruits at `/fruits`
  const data = await res.json();
  res.data = data;
  if (res.ok) { // if response status code is less than 400
    // dispatch the receive fruits POJO action
    dispatch(receiveFruits(data.fruits));
  } else {
    // if response status code is 400 or greater, throw the response as an error
    throw res;
  }
};

const receiveFruits = (fruits) => {
  return {
    type: RECEIVE_FRUITS,
    fruits,
  };
};
```

When `fetchFruits` is dispatched, it will get intercepted by the `thunk`
middleware and invoked with the `dispatch` store method. That thunk function
will make a, AJAX call to the backend to the route `/fruits`. When the AJAX
request comes back, the response is processed. If the response has a status
code of less than 400, `receiveFruits`'s action is dispatched using the
data from the response. Finally, that action will hit the reducer, change the
store, and update the React components.

## Dispatching thunk actions in a component

Dispatching thunk actions in a component is just like dispatching regular POJO
actions. Use the `useDispatch` React-Redux hook to get the store's `dispatch`
method and dispatch a thunk action on a user input or in a `useEffect`.

## What you learned

In this article, you learned how to write a thunk action creator to make an
asynchronous request to an API and dispatch an action when the response is
received.

[thunk-source]: https://github.com/gaearon/redux-thunk/blob/master/src/index.js
[redux-fruit-stand-examples]: https://github.com/appacademy-starters/redux-fruit-stand-examples
