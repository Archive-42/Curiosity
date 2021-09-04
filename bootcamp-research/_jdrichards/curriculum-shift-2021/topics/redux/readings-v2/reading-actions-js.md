
# Actions

As you've already learned from an earlier article, dispatching **actions** is
the only way to **trigger** changes to the store's state. Remember, actions are
simple POJOs with a mandatory `type` key and optional payload keys containing
new information. They get sent using `store.dispatch()` and are the primary
drivers of the Redux loop.

When you finish this article, you should be able to:

* Write an action creator function to facilitate in the creation of action
  objects
* Use constants to define action types to prevent simple typos in action type
  string literals

## Using action creators

When an action is dispatched, any new state data must be passed along as the
**payload**. However, when these action payloads are generated dynamically, it
becomes necessary to extrapolate the creation of the action object into a
function. These functions are called **action creators**. The JavaScript objects
they return are the **actions**.

For example, an action creator function to create 'ADD_FRUIT' actions looks like
this:

```js
const addFruit = (fruit) => {
  return {
    type: 'ADD_FRUIT',
    fruit,
  };
};
```

You can also rewrite the above arrow function to use an implicit return value:

```js
const addFruit = (fruit) => ({
  type: 'ADD_FRUIT',
  fruit,
});
```

> While either approach for defining action creators using arrow functions
> works, the latter approach of using an implicit return value makes it more
> difficult to debug the Redux cycle because you cannot use debugging tools in
> the function like `debugger` or `console.log`.

To initiate a dispatch, you pass the result of calling an action creator to
`store.dispatch()`.

For example, to create an action with a type of `ADD_FRUIT` with a fruit
payload and dispatch it at the same time:

```js
store.dispatch(addFruit('apple'));
```

This is the same as:

```js
const appleAction = addFruit('apple');
store.dispatch(appleAction);
```

## Preventing typos in action type string literals

Instead of using string literals as the `type` property for an action, use a
constant to avoid typos. The store's reducer is checking the action's `type` for
a match. If you use the same constant as the value for the action's `type` and
the case in the reducer, then that will ensure that they match.

Creating constants for the action type string literals ensures that an error is
thrown if the constant name is mistyped anywhere that it is used. You could make
this string _anything_, it just needs to be unique within your application.

You may see a variation of the [Ducks] naming convention for action `type`'s in
your future projects. If you abide strictly by the [Ducks] naming convention,
then action `type`'s must be in the form of
`npm-module-or-app/reducer-name/ACTION_TYPE`.

For example, for an application called Grocery App with a Redux reducer that
manages the fruits state, the action `type` for adding fruit to the fruits state
would look something like this:

```js
const ADD_FRUIT = 'groceryApp/fruit/ADD_FRUIT';

const addFruit = (fruit) => {
  return {
    type: ADD_FRUIT,
    fruit,
  }
};
```

## Actions trigger, not update, the state

Actions **do not update** the state directly. They are the **triggers** for
updating the state. Reducers update the state based on the action. The actions
defines what kind of change the state should be undergoing. The reducers define
how the state is changed based on the type of action.

Actions and reducers work together to update the state.

## What you learned

In this article, you learned how to write an action creator function to
facilitate in the creation of action objects. You also learned how to use
constants to define action types to prevent simple typos in action type string
literals. Finally, you learned about the [Ducks] naming convention for defining
action type string literals.

## See also...

To learn more about actions, see the official [Redux
documentation][redux-js-actions].

[redux-js-actions]: http://redux.js.org/docs/basics/Actions.html
[redux-fruit-stand-examples]: https://github.com/appacademy-starters/redux-fruit-stand-examples
[Ducks]: https://github.com/erikras/ducks-modular-redux
