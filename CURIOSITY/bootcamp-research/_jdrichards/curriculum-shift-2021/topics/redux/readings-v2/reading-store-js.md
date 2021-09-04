
# Redux Store

The **store** is the central element of Redux's architecture. It holds the
global **state** of an application. The store is responsible for updating the
global state via its **reducer**, broadcasting state updates via
**subscription**, and listening for **actions** that tell it when to update the
state.

When you finish this article, you should be able to:

* Describe the role of the store in the Redux architecture
* Use the `createStore` method to create an instance of the Redux store
* Use the `store.getState` method to get the current state
* Use the `store.dispatch` method to dispatch an action to trigger a state
  update
* Use the `store.subscribe` method to listen for state updates

## Managing state

The Redux store manages the global state of the application. You should only
read and update the global state through the store. The store can also trigger
functions to be called whenever the state is updated.

The store is responsible for:

1. Returning the current state
2. Updating the state
3. Notify subscribed components (call functions) whenever the state gets updated

### Store API

A Redux store is just an object that holds the application state, wrapped in a
minimalist API. The store has three methods: `getState()`, `dispatch(action)`,
and `subscribe(callback)`.

### Store methods

* `getState()` - Returns the store's current state.
* `dispatch(action)` - Passes an `action` into the store's `reducer` telling it
  what information to update.
* `subscribe(callback)` - Registers a callback to be triggered whenever the
  store updates. Returns a function, which when invoked, unsubscribes the
  callback function from the store.

## Creating the store

The `redux` library provides us with a `createStore()` method, which takes up to
three arguments and returns a Redux store.

```js
import { createStore } from 'redux';

const store = createStore(reducer, preloadedState, enhancer);
```

* `reducer` (required) - A reducing function that receives the store's current
  state and incoming action, determines how to update the store's state, and
  returns the next state (more on this in a moment).
* `preloadedState` (optional) - An `object` representing any application state
  that existed before the store was created.
* `enhancer` (optional) - A `function` that adds extra functionality to the
  store.

> You'll learn more about how to use the `preloadedState` and `enhancer`
> parameters later in this lesson. For now you'll focus on creating a store with
> just the single required `reducer` parameter.

## Updating the store

Store updates can only be triggered by dispatching **actions**:

```js
store.dispatch(action);
```

An `action` in Redux is just a **plain-old JavaScript object (POJO)** with:

* a `type` key indicating the action being performed, and
* optional payload keys containing any new information.

For example, you would use the following `addOrange` action to add an orange to
the store's state. Notice how it has a `type` of 'ADD_FRUIT' and a `fruit`
payload of 'orange':

```js
const addOrange = {
  type: 'ADD_FRUIT',
  fruit: 'orange',
};
```

Any action that gets dispatched will be passed into the `store`'s **root
reducer**. A **reducer** is a function that accepts the current state and an
action and determines how the next state will look like based on the action.

You'll read more about the reducer in just a bit, but for now, think of it a
reducer is like a calculator. You know that when you input two numbers and the
"plus" action type, then the output will be the two numbers added. When you
input two numbers and the "minus" action type, then the output will be the two
numbers subtracted. When you input one number and the "sqrt" action type, then
the output will be the square root of the input number. The reducer returns a
new state based on actions with programmed action types.

When `store.dispatch()` is called, the store passes its current `state`, along
with the `action` being dispatched, to the `reducer`. The `reducer` function
takes the two arguments (`state` and `action`) and returns the next `state`.

Here's an example of a reducer:

```js
const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'ACTION_TYPE_ONE':
      return { type: 1 };
    case 'ACTION_TYPE_TWO':
      return { type: 2 };
    case 'ACTION_TYPE_RESET':
      return {};
    default:
      return state;
  }
};
```

The reducer's `state` parameter provides a default value; this is the **initial
state** of our store prior to any actions. In this case, it's an empty object,
but it can be an array or any data type. However in Redux, [**the state should
be treated as immutable**][why-immutable], so the reducer must return something
different from the previous state whenever the state needs to be updated.
That means that a state represented by an array or an object, must be updated
with a **new array or object**, not a mutated version of the previous array or
object.

The simplest way to return a new array or object with the same contents, is by
using the spread operator, `...`.

```js
const obj = { hello: "world" };
const newObj = { ...obj }; // { hello: "world" }

const arr = [0, 1, 2, 3];
const newArr = [ ...arr ]; // [0, 1, 2, 3]
```

To overwrite a key and create a new object at the same time, you can use the
spread operator like so:

```js
const obj = {
  a: "hello",
  b: "world"
};
const newObj = {
  ...obj,
  b: "WORLD!!"
}; // { a: "hello", b: "WORLD!!" }
```

You'll learn more about creating actions and reducers in a separate reading.

## Subscribing to the store

Once the store has processed a `dispatch()`, it triggers all its subscribers.
Subscribers are callbacks that can be added to the store via `subscribe()`.

You can define a callback `display` and subscribe it to the store:

```js
const display = () => {
  console.log(store.getState());
};

const unsubscribeDisplay = store.subscribe(display);

store.dispatch(addOrange); // [ 'orange', 'orange' ]

// display will no longer be invoked after store.dispatch()
unsubscribeDisplay();

store.dispatch(addOrange); // no output
```

In the example above, the store processed the dispatched action and then called
all of its subscribers in response. The only subscriber is your `display`
callback which logs the current state when called.

> Later in this lesson, you'll learn how to use the `store.subscribe()` method
> to connect a React component to the store so that it can listen for global
> state updates.

## Reviewing a simple example

To create the store, you need a root reducer, an optional preloaded state, and
an optional enhancer. Invoke the `createStore` method from the `redux` library
with them which will return a Redux `store`.

```js
import { createStore } from 'redux';

const store = createStore(reducer, preloadedState, enhancer);
```

To get the current state of the store, you can call the `getState` method on
the store:

```js
const currentState = store.getState();
```

To update the state of the store, you can call the `dispatch` method on the
`store` with an **action** or a POJO as an argument. The action will hit the
store's root reducer and, depending on how the reducer handles it, may cause a
new state to be returned from the store.

```js
const stateBeforeAction = store.getState();

store.dispatch({
  type: 'ACTION_TYPE',
  payload: 'whatever is needed for the new state'
});

const stateAfterAction = store.getState();
```

After updating the state of the store, any functions passed into the `subscribe`
method on the `store` will be called with the new state.

```js
store.subscribe(() => console.log(store.getState()));

const stateBeforeAction = store.getState();

store.dispatch({
  type: 'ACTION_TYPE',
  payload: 'whatever is needed for the new state'
});

// The new state will be logged to the console

const stateAfterAction = store.getState();
```

Later, you'll see how to use Redux with React and how to organize your Redux
code into separate modules.

## What you learned

In this article, you learned about the role of the store in the Redux
architecture. You saw how to use the `createStore` method to create a store
instance, the `store.dispatch` method to dispatch an action to trigger a state
update, the `store.subscribe` method to listen for state updates, and
`store.getState` method to get the current state.

## See also...

To learn more about the store, see the official [Redux
documentation][redux-js-store].

[why-immutable]: https://github.com/reactjs/redux/issues/758
[redux-js-store]: http://redux.js.org/docs/basics/Store.html
