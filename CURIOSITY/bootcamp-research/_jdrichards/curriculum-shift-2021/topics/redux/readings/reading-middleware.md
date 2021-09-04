# Redux Middleware

In Redux, middleware specifically refers to an `enhancer` passed to the Store
via `createStore()`. When a `dispatch` is made, the middleware intercepts the
`action` before it reaches the `reducer`. The middleware can then:

- **resolve the action itself** (for example, by making an AJAX request),
- **pass along the action** (if the middleware isn't concerned with it),
- **generate a side effect** (such as logging debugging information),
- **send another dispatch** (if the action triggers other actions),
- or some combination thereof.

We will use Redux middleware for logging information about the store and making
asynchronous API requests, but you can also use it for crash reporting, routing,
and many other applications.

## Applying middleware to a Redux store

Recall the `redux` library's `createStore()` function used to instantiate a
`Store`.  `createStore()` accepts 3 arguments (`reducer, preloadedState,
enhancer`); middleware is given to the store via the optional `enhancer`
argument.

Consider the following example, where we import a third-party `logger`
middleware:

```js
// store/store.js

import { createStore, applyMiddleware } from 'redux';
import rootReducer from 'reducers';
import logger from 'redux-logger';

let configureStore = (preloadedState = {}) => (
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(logger)
  )
);

export default configureStore;
```

Any actions dispatched to the `store` pass through our `logger` middleware,
which prints the store's state before and after the `action` is processed.

**Note:** `applyMiddleware()` accepts multiple arguments, so we can also apply
more middleware if necessary.

## Middleware signature

In addition to importing third-party middlewares such as the `logger` above, you
will sometimes need to roll your own. All middleware functions need to conform
to  the same signature in order to be compatible with the Store and
other middlewares.

A [**function signature**][signature] is the set of inputs and output of a
function. A Redux middleware must always have the following signature:

```js
const middleware = store => next => action => {
  // side effects, if any
  return next(action);
};
```

Every middleware receives the `store` as an argument and returns a function that
takes the `next` link in the middleware chain as an argument. That function
returns *another* function that receives the `action` and then triggers any side
effects before returning the result of the `next(action)`. Side effects can
include triggering AJAX requests, logging to the console, and more. Side effects
can also happen after the `next(action)` is called, like so:

```js
const middleware = store => next => action => {
  const result = next(action);
  // side effect using `result`
  return result;
};
```

## Example: logger

Let's hand-roll the `logger` middleware we imported above. It should print out
the state before and after each dispatch, allowing us to check if our reducers
are working as expected. This middleware should:

-	receive the store as its only argument,
- return a function that receives the `next` middleware,
-	which should itself return a function receiving the `action`.

The body of the innermost function is where we want to do our logging. That function should:

- `console.log` the `action`
- `console.log` the result of `store.getState()` (pre-dispatch)
- call `next(action)` to pass the action on to the rest of the middlewares, and
eventually, the reducer.
- save the `result` of the `next(action)` variable, to be returned later.
- `console.log` the new `store.getState()`
- return the saved `result`.

```js
const logger = store => next => action => {

  console.log('Action received:', action);
  console.log('State pre-dispatch:', store.getState());

  let result = next(action);

  console.log('State post-dispatch:', store.getState());

  return result;
};
```

Now, whenever we dispatch an action, we'll see its effect on the Store.

> I know that those last few paragraphs probably seemed crazy, and they are.
> Understanding middleware takes practice, so don't worry if every detail hasn't
> clicked. Just memorize the middleware signature and you will be OK.

## redux-logger

As we move forward with Redux, we will want to have access to our store's state for debugging purposes. Including the `redux-logger` npm package and adding it as a middleware gives us access (through the console) to the previous state, action, and next state with each dispatch. This is incredibly convenient for debugging purposes and avoids such unpleasantness as attaching the `store` to the `window`. 

![Redux Logger Image]

Follow the example below to include it in your projects:

* Include the `redux-logger` package:

```sh
npm install redux-logger --save
```

* Pass an instance of `redux-logger` to `applyMiddleware` when creating your store:
	
**NB: `logger` must be the last middleware passed into `applyMiddleware`**, otherwise it will log the thunk and any involved promises

```js
// store/store.js

import { createStore, applyMiddleware } from 'redux';
import rootReducer from 'reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

let configureStore = (preloadedState = {}) => (
  createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, logger)
  )
);

export default configureStore;  
```

[signature]: https://developer.mozilla.org/en-US/docs/Glossary/Signature/Function
[Redux Logger Image]: https://camo.githubusercontent.com/73b5dc54ec615f18746e8472e02d130f79a3cf9f/687474703a2f2f692e696d6775722e636f6d2f43674175486c452e706e67
