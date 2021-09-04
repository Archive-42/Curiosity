
# Using Redux with React

[slides]

<slide1>

<slide2> Hi there! This is James.

When you started learning Redux, you kept things as simple as possible and
focused on the basics of Redux independent of React. Now you're ready to learn
how to use Redux with React.

In this video, I'll add Redux actions, a reducer, and a store to a React
project. Then I'll update a React class component to subscribe to a Redux store
to listen for state changes so that it can know when to retrieve and render the
latest state. Then I'll update a React component to dispatch actions to a Redux
store when an event is trigger through the UI.

<slide3> Just a quick heads up that the techniques I'll use in this article are
just the first step in learning how to integrate Redux into a React application.
This is especially true of the code that I'll be writing in the React
components. As with most programming tasks, there's more than one way to
integrate Redux. I'll be starting with the approach that's the easiest to
understand and to get started with but you'll learn better ways of doing things
as you work your way through this lesson.

<slide4> Before I start writing code, let's review how a React component fits
into the flow of data in a Redux loop. To start, an event in a React component
is triggered, often by the user interacting with the UI, like clicking a button.

<slide5> An event handler in the component translates the event into an action
<slide6> and calls the `store.dispatch()` method <slide7> to dispatch the action
to the store.

<slide8> The store passes the action and the current state to the reducer
function.

<slide9> The reducer uses the action type and payload to create the next state.

<slide10> When the state is updated, the store calls any subscribers to notify
them that the state has changed.

<slide11> The component--who called `store.subscribe()` to listen for state
updates--is notified by the store that the state has changed, <slide12>
retrieves the latest state using `store.getState()` <slide13> and renders. And
that's one time through the Redux loop! As a user interacts with a React/Redux
application, this data flow will happen many times.

<slide14> To integrate Redux into an existing React application, I'm going to
follow these high-level steps. I'll start with using npm to install Redux then
I'll define the actions, reducer, and store in the React project. Once I've
confirmed the setup of the Redux related items, I'll start updating each of the
project's React components that need to interact with the Redux store. I'll use
the `store.subscribe` method to listen for state updates, `store.getState` to
retrieve state for rendering, and `store.dispatch` to dispatch actions to the
store.

<slide15> If you'd like to follow along, clone the
appacademy-starters/redux-fruit-stand-with-react-starter repo. The Fruit Stand
example application is a React application created by the Create React App
tooling.

<slide16> Let's get started with writing code!

<switch to vs code> Review the general layout of the project...

Show that `redux` is already listed as a dependency in the `package.json`
file...

Install the project's dependencies...

Test running the application...

<start teleprompter> Now I'm ready to add the Redux related items to the
project. In this video, the focus is on the process of integrating Redux into
React and less overall on writing the code for Redux actions, reducers, and
store. In fact, I'm going to borrow the Redux code from an earlier simple Fruit
Stand Node.js app. I'll split that code into separate files within the React
project, but other than that, there won't be any changes to that code. <stop
teleprompter> teleprompter>

```js
// ./src/actions/fruitActions.js

export const ADD_FRUIT = 'ADD_FRUIT';
export const ADD_FRUITS = 'ADD_FRUITS';
export const SELL_FRUIT = 'SELL_FRUIT';
export const SELL_OUT = 'SELL_OUT';

export const addFruit = (fruit) => ({
  type: ADD_FRUIT,
  fruit,
});

export const addFruits = (fruits) => ({
  type: ADD_FRUITS,
  fruits,
});

export const sellFruit = (fruit) => ({
  type: SELL_FRUIT,
  fruit,
});

export const sellOut = () => ({
  type: SELL_OUT,
});
```

```js
// ./src/components/fruitReducer.js

import {
  ADD_FRUIT,
  ADD_FRUITS,
  SELL_FRUIT,
  SELL_OUT,
} from '../actions/fruitActions';

const fruitReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_FRUIT:
      return [...state, action.fruit];
    case ADD_FRUITS:
      return [...state, ...action.fruits];
    case SELL_FRUIT:
      const index = state.indexOf(action.fruit);
      if (index !== -1) {
        // remove first instance of action.fruit
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
      return state; // if action.fruit is not in state, return previous state
    case SELL_OUT:
      return [];
    default:
      return state;
  }
};

export default fruitReducer;
```

```js
// ./src/store.js

import { createStore } from 'redux';
import fruitReducer from './reducers/fruitReducer';

const store = createStore(fruitReducer);

export default store;
```

Before I start updating any of the React components so I can use the app to test
the fruit actions and reducer, I can add the store and the fruit action creators
to the window in the `index.js` file...

```js
import store from './store';
import { addFruit, addFruits, sellFruit, sellOut } from './actions/fruitActions';

window.store = store;
window.addFruit = addFruit;
window.addFruits = addFruits;
window.sellFruit = sellFruit;
window.sellOut = sellOut;
```

Now I can open the dev tools in the browser and access the store on the window
object... which allows me to call `store.dispatch` passing in a call to the
`addFruit` action creator...

```js
store.dispatch(addFruit('APPLE'))
```

I can also test the other action creators...

Now that I've confirmed that the action creators and reducer are working as
expected, I can turn my attention to updating the React components...

I'll start with updating the `FruitList` component to retrieve and render the
fruit state from the Redux store...

Import the store...

```js
import store from '../store';
``` 

The `componentDidMount` and `componentWillUnmount` class component lifecycle
methods can be used to ensure that the component _subscribes_ to the store when
it's mounted and _unsubscribes_ from the store when the component is about to be
unmounted:

Within the `componentDidMount` lifecycle method, subscribe to the store...

```js
this.unsubscribe = store.subscribe(() => {
  this.forceUpdate();
});
```

Then in `componentWillUnmount` unsubscribe from the store...

```js
if (this.unsubscribe) {
  this.unsubscribe();
}
```

In the `render` method get the current state...

```js
const fruit = store.getState();
```

The completed component...

```js
// ./src/components/FruitList.js

import React from 'react';
import store from '../store';

class FruitList extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const fruit = store.getState();

    return (
      <div>
        {fruit.length > 0
          ? <ul>{fruit.map((fruitName, index) => <li key={index}>{fruitName}</li>)}</ul>
          : <span>No fruit currently in stock!</span>
        }
      </div>
    );
  }
}

export default FruitList;
```

<start teleprompter> Let's review what I did here. Components that need to
render state from the store can subscribe to listen for state updates using the
`store.subscribe` method. The `forceUpdate` method is called to render the
component when a state update occurs. The `store.getState` method is called
within the component's `render` method to retrieve the current state. This
approach ensures that whenever an action is dispatched to the store and the
reducer has processed the action and updated the state, the component will
retrieve and render the updated state.

It's important to note, that calling `forceUpdate` causes `render` to be called
without first calling `shouldComponentUpdate`. This approach works, but it's a
bit blunt, since re-rendering a parent causes all its children to re-render.
Later in this lesson, you'll learn how the React-Redux library can be used to
solve this problem. <stop teleprompter>

Now I'll test my work...

Start the app...

Use the console to dispatch `ADD_FRUIT` actions...

Check that the `FruitList` component displays the fruit...

Update the `FruitQuickAdd` component...

Review the `App`, `FruitManager`, `FruitQuickAdd` components... get a sense for
how the FruitQuickAdd component fits into the overall app...

Updating a component to dispatch an action to the store is simpler overall than
listening for and rendering state updates. I just need to import the appropriate
action creator function and use the `store.dispatch` method within a event
handler to dispatch the action...

Import the store...

```js
import store from '../store';
```

Import the `addFruit` action creator...

```js
import { addFruit } from '../actions/fruitActions';
```

In the `addFruitClick` event handler, dispatch a call to the `addFruit` action
creator...

```js
store.dispatch(addFruit(fruit));
```

The completed component...

```js
// ./src/components/FruitQuickAdd.js

import React from 'react';
import store from '../store';
import { addFruit } from '../actions/fruitActions';

class FruitQuickAdd extends React.Component {
  addFruitClick = (event) => {
    const fruit = event.target.innerText;
    store.dispatch(addFruit(fruit));
  }

  render() {
    return (
      <div>
        <h3>Quick Add</h3>
        <button onClick={this.addFruitClick}>APPLE</button>
        <button onClick={this.addFruitClick}>ORANGE</button>
      </div>  
    );
  }
}

export default FruitQuickAdd;
```

Test the app...

Update the `FruitSeller` component...

Review the `App`, `FruitManager`, `FruitSeller` components... get a sense
for how the FruitSeller component fits into the overall app...

<start teleprompter> The `FruitSeller` component needs to listen for and render
state updates to render a collection of buttons--one for each distinct fruit
available in the fruit stand. And it needs to dispatch actions to the store,
when it handles button clicks to sell a fruit or to sell out all of the fruits.
The `FruitSeller` component is sort of a mash up of the `FruitList` and
`FruitQuickAdd` components! <stop teleprompter>

Import the store...

```js
import store from '../store';
```

First the state data for the list of distinct fruit... start with updating the
lifecycle methods to subscribe and unsubscribe from the store...

```js
componentDidMount() {
  this.unsubscribe = store.subscribe(() => {
    this.forceUpdate();
  });
}

componentWillUnmount() {
  if (this.unsubscribe) {
    this.unsubscribe();
  }
}
```

Then in the `render` method, get the state from the store...

```js
const fruit = store.getState();
const distinctFruit = Array.from(new Set(fruit)).sort();
```

Notice that the array of distinct fruit is used to render a list of buttons,
each of which has a `onClick` event handler to handle selling a fruit of a
specific type... and there's a button for selling out the entire inventory of
fruit... we need to update the event handlers to dispatch the appropriate
actions...

First I'll run the app and see the expected buttons are rendered...

Import the action creators...

```js
import { sellFruit, sellOut } from '../actions/fruitActions';
```

In the `sellFruitClick` event handler, dispatch a call to the `sellFruit` action
creator...

```js
store.dispatch(sellFruit(fruit));
```

And in the `sellOutClick` event handler, dispatch a call to the `sellOut` action
creator...

```js
store.dispatch(sellOut());
```

The completed component...

```js
// ./src/components/FruitSeller.js

import React from 'react';
import store from '../store';
import { sellFruit, sellOut } from '../actions/fruitActions';

class FruitSeller extends React.Component {
  sellFruitClick = (event) => {
    const fruit = event.target.innerText;
    store.dispatch(sellFruit(fruit));
  }

  sellOutClick = () => {
    store.dispatch(sellOut());
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const fruit = store.getState();
    const distinctFruit = Array.from(new Set(fruit)).sort();

    if (distinctFruit.length === 0) {
      return null;
    }

    return (
      <div>
        <h3>Sell</h3>
        {distinctFruit.map((fruitName, index) => (
          <button key={index} onClick={this.sellFruitClick}>{fruitName}</button>
        ))}
        <button onClick={this.sellOutClick}>SELL OUT</button>
      </div>
    );
  }
}

export default FruitSeller;
```

Test the app...

<start teleprompter> I just have the `BulkAdd` component left to update. This is
the perfect chance to get a bit of practice on your own to help you cement what
you've learned up to this point.

If you're following along, go ahead and pause the video and give it a try...
even if you're not following along, pause the video and think about what needs
to be done so that this component will allow a user to add one or more fruits...
<stop teleprompter>

Import the store and the action creator...

```js
import store from '../store';
import { addFruits } from '../actions/fruitActions';
```

Then in the `addFruits` event handler, dispatch a call to the action creator...

```js
store.dispatch(addFruits(fruit));
```

Test the app one more time...

Excellent! Everything seems to be working...

<start teleprompter> And that's it for this video! If you'd like to review the
application shown in this video, be sure to check out the
redux-fruit-stand-examples repo. <show repo in the browser>

This repo contains a series of Fruit Stand examples that starts with a simple
Node.js application and ends with a complete full-stack application built using
React, Node.js and Express, and of course, Redux.

Thanks for watching and I'll see you next time!

[slides]: https://docs.google.com/presentation/d/1Dne2jFsSUU8_JBZwTosx7dbS1TlPcDeK4XNc7-1oHVs/edit#
