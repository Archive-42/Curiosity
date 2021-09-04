
# Reducers

As you saw in an earlier article, the Redux store has a **reducer** function for
updating its state. The reducer function receives the current `state` and an
`action`, updates the state appropriately based on the `action.type`, and
returns the next state.

When you finish this article, you should be able to:

* Explain what a _reducer_ is
* Use a `switch` statement within a reducer function to handle multiple action
  types
* Describe why it's important for a reducer to avoid mutating the current state
  when creating the next state
* Splitting a reducer into multiple reducers to handle different slices of
  states
* Use the Redux `combineReducers` method to combine multiple reducers into a
  single root reducer

## Updating the reducer to handle additional action types

Take a look at this example of a reducer function below that handles fruits.

```js
const fruitReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FRUIT':
      return [...state, action.fruit];
    default:
      return state;
  }
};
```

When the store initializes, it calls its reducer with an `undefined` `state`,
allowing the reducer to dictate the store's initial state via the `state`
parameter's default value.

The bulk of the reducer function then implements updates to the state. First,
the reducer decides what logic to implement based on the `action.type` `switch`.
Then, it creates and returns a new object representing the next state (after
processing the action) if any of the information needs to be changed. The
`state` is returned unchanged if no cases match the `action.type`, meaning that
the reducer doesn't _care_ about that action (e.g. `{type:
'NEW_TRANSFORMERS_SEQUEL'}`).

In the above example, the reducer's initial state is set to an empty array (i.e.
`[]`). The reducer returns a new array with `action.fruit` appended to the
previous `state` if `action.type` is `'ADD_FRUIT'`. Otherwise, it returns the
`state` unchanged.

Additional `case` clauses can be added to update the reducer to handle the
following action types:

* `'ADD_FRUITS'` - Add an array of fruits to the inventory of fruits
* `'SELL_FRUIT'` - Remove the first instance of a fruit if available
* `'SELL_OUT'` - Someone bought the whole inventory of fruit! Return an empty
  array

```js
const fruitReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FRUIT':
      return [...state, action.fruit];
    case 'ADD_FRUITS':
      return [...state, ...action.fruits];
    case 'SELL_FRUIT':
      // find the index of the first instance of action.fruit
      const index = state.indexOf(action.fruit);
      if (index !== -1) {
        // remove first instance of action.fruit using the index and return a new array
        const newState = [...state];
        newState.splice(index, 1);
        return newState;
      }
      return state; // if action.fruit is not in state, return previous state
    case 'SELL_OUT':
      return [];
    default:
      return state;
  }
};
```

Take a look at the documentation for a refresher on how the [`Array.splice`]
method works.

The following expression may look unnecessary at first glance:

```js
const newState = [...state];
newState.splice(index, 1);
```

A new array is copied from the previous state, then [`Array.splice`] is called
on the new array. [`Array.splice`] removes an element from the original array,
but it also **mutates the original array**. If the state needs to be changed,
the reducer **must return a new array**. To avoid mutating the state, a copy of
the state is first created then mutated.

This approach to removing an element from an array is just one way to complete
the operation without modifying or mutating the original array.

## Avoiding state mutations

Inside a Redux reducer, you must never mutate its arguments (i.e. `state` and
`action`). **Your reducer must return a new object if the state changes**.
[Here's why][why-immutable].

Here's an example of a _bad_ reducer which mutates the previous state.

```js
const badReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      state.count++;
      return state;
    default:
      return state;
  }
};
```

And here's an example of a good reducer which uses `Object.assign` to create a
shallow duplicate of the previous `state`:

```js
const goodReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      const nextState = Object.assign({}, state);
      nextState.count++;
      return nextState;
    default:
      return state;
  }
};
```

## Splitting and Combining Reducers

As your applications increase in size and complexity, it'll become necessary to
use multiple reducers, each managing a slice of state.

### Splitting reducers

Imagine that your fruits business is extremely successful and it grows so much
that you need multiple farmers helping you to keep your stand stocked with
fruit. Your application's state will need to grow to store not only an array of
`fruit` but also a `farmers` object that keeps track of your farmers.

Here's a sample state tree of your updated application:

```js
{
  fruit: [
    'APPLE',
    'APPLE',
    'ORANGE',
    'GRAPEFRUIT',
    'WATERMELON',
  ],
  farmers: {
    1: {
      id: 1,
      name: 'John Smith',
      paid: false,
    },
    2: {
      id: 2,
      name: 'Sally Jones',
      paid: false,
    },
  }
}
```

The store now needs to handle new action types like `'HIRE_FARMER'` and
`'PAY_FARMER'` by updating the `farmers` slice of state. You could add more
cases to your existing reducer, but eventually the existing reducer would become
too large and difficult to manage. The solution is to split the reducer into
separate `fruit` and `farmers` reducers.

Splitting up the reducer into multiple reducers handling separate, independent
_slices_ of state is called **reducer composition**, and it's the fundamental
pattern of building Redux apps. Because each reducer only handles a single
_slice_ of state, its `state` parameter corresponds only to the part of the
state that it manages and it only responds to actions that concern that slice of
state.

To split up the Redux store state for the fruits example with farmers, you can
split the root reducer into two reducers:

* `fruitReducer` - A reducing function that handles actions updating the
  `fruits` slice of state
* `farmersReducer` - A reducing function that handles actions updating the new
  `farmers` slice of state

## Combining reducers

You can split a reducer into multiple reducers to handle different slices of
states. However, `createStore` only takesone `reducer` argument, so you must
combine your reducers back into a single reducer to pass to the store. To do
this you'll use the `combineReducers` method from the `redux` package and pass
it an object that maps state keys to the reducers that handle those slices of
state. Below, the `combineReducers` maps the `fruitReducer` for the `fruit`
slice of state and the `farmersReducer` for the `farmers` slice of state.
Invoking the `combineReducers` function returns a single `rootReducer` that you
can use to create your Redux store.

```js
import { combineReducers } from 'redux';
import { createStore } from 'redux';

const rootReducer = combineReducers({
  fruit: fruitReducer,
  farmers: farmersReducer
});

const store = createStore(rootReducer);

export default store;
```

## What you learned

In this article, you learned about reducers and how to use a `switch` statement
within a reducer function to handle multiple action types. You also learned why
it's important for a reducer to avoid mutating the current state when creating
the next state. You learned how to define multiple reducers to manage individual
slices of state. Finally, you learned how to use the Redux `combineReducers`
method to combine multiple reducers into a single reducer.

## See also...

To learn more about reducers, see the official [Redux documentation].

[`Array.splice`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
[why-immutable]: https://github.com/reactjs/redux/issues/758
[Redux documentation]: https://redux.js.org/basics/reducers
