
# Splitting and Combining Reducers

[slides]

<slide1>

<slide2> Hi there! This is James.

So far, you've been using a single reducer to manage state in your Redux store.
As applications grow in size and complexity, it becomes necessary to use
multiple reducers, each managing a slice of state.

In this video, I'll define multiple reducers to manage individual slices of
state. Then I'll use the Redux `combineReducers` method to combine multiple
reducers into a single root reducer. And lastly, I'll update a reducer to
delegate state updates to a subordinate reducer.

<slide3> So, here's the situation. My fruit stand has been extremely successful.
It's grown so much that I need multiple farmers helping to keep the stand
stocked with fruit. To keep track of the farmers, I need to grow the
application's state to store not only an array of `fruit` but also a `farmers`
object.

<slide4> I also need the store to handle new action types like 'HIRE_FARMER' and
'PAY_FARMER'. To process those action types, I could add more switch cases to my
existing reducer, but over time as I add more and more action types the reducer
would become too large and difficult to manage.

<slide5> The solution is to split the reducer into separate `fruit` and
`farmers` reducers. Splitting up a monolithic reducer into multiple reducers
handling separate, independent slices of state is called reducer composition.
With each reducer only handling a single slice of state, the `state` parameter
corresponds only to the part of the state that it manages and it only processes
actions that concern that slice of state.

<slide6> Let's get started with writing code and split up the Fruit Stand
application's reducer into two reducers: `fruitReducer` and `farmersReducer`.

<switch to vs code> Quickly review the existing `fruitReducer`...

* Action types...
* `state` and `action` parameters...
* `case` clauses... one per action type...
* `default` case... a reducer should always return the `state` parameter when
  the `action.type` parameter doesn't match any of the expected action types...

```js
// ./src/reducers/fruitReducer.js

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
      if (index) !== -1) {
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

I'll start with defining the two actions that I need for farmers...
`'HIRE_FARMER'` and `'PAY_FARMER'`...

```js
// ./src/actions/farmersActions.js

export const HIRE_FARMER = 'HIRE_FARMER';
export const PAY_FARMER = 'PAY_FARMER';

export const hireFarmer = (name) => ({
  type: HIRE_FARMER,
  id: new Date().getTime(),
  name,
});

export const payFarmer = (id) => ({
  type: PAY_FARMER,
  id,
});
```

Now I can add the `farmersReducer` function...

```js
// ./src/reducers/farmersReducer.js

import { HIRE_FARMER, PAY_FARMER } from '../actions/farmersActions';

const farmersReducer = (state = {}, action) => {
  const nextState = Object.assign({}, state);
  switch (action.type) {
    case HIRE_FARMER:
      const farmerToHire = {
        id: action.id,
        name: action.name,
        paid: false
      };
      nextState[action.id] = farmerToHire;
      return nextState;
    case PAY_FARMER:
      const farmerToPay = nextState[action.id];
      farmerToPay.paid = true;
      return nextState;
    default:
      return state;
  }
};

export default farmersReducer;
```

<switch to the `store.js` file>

<start teleprompter> My reducer setup is now much more modular. However, the
Redux `createStore` function only takes one `reducer` argument, so I have to
combine my reducers back into a single reducer to pass to the store. To do this
I'll use the `combineReducers` function from the `redux` package. <stop
teleprompter>

I'll add a `rootReducer.js` file to the `reducers` folder...

Import the `combineReducers` function and my reducers...

I'll create a single, `rootReducer` by calling the `combineReducers` function
passing in an object that maps state keys to the reducers that handle those
slices of state...

```js
// ./src/reducers/rootReducer.js

import { combineReducers } from 'redux';
import fruitReducer from './fruitReducer';
import farmersReducer from './farmersReducer';

const rootReducer = combineReducers({
  fruit: fruitReducer,
  farmers: farmersReducer
});

export default rootReducer;
```

Back in the `store.js` file, I'll import the `rootReducer` and update the call
to the `createStore` function to pass the `rootReducer`...

```js
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer);

export default store;
```

Run the app... and an error occurs...

The state persisted in local storage no longer matches the state shape expected
by the app... we can delete the existing local storage or we can change the
state key in the `localStorage.js` file which would allow the previous version
to exist for older versions of the app and a new version for the updated app.

```js
const STATE_KEY = 'fruitstand-with-farmers';
```

Run the app again... and another error occurs...

This time the FruitList component is expecting `fruit` to be the entire state,
but it's now just a slice of the available state... update the statement that
retrieves the state...

```js
const { fruit } = store.getState();
```

I also need to make this change to the FruitSeller component...

```js
const { fruit } = store.getState();
```

And things are back to what they were...

Before I add the farmer related components so I can use the app to test the
farmers actions and reducer, I can add the store and the farmers action creators
to the window in the `index.js` file...

```js
import store from './store';
import { hireFarmer, payFarmer } from './actions/farmersActions';

window.store = store;
window.hireFarmer = hireFarmer;
window.payFarmer = payFarmer;
```

Now I can open the dev tools in the browser and access the store on the window
object... which allows me to call dispatch passing in a call to the `hireFarmer`
action creator...

```js
store.dispatch(hireFarmer('Charlie Brown'))
```

I can also test the `payFarmer` action creator...

```js
store.dispatch(payFarmer(1595461090018))
```

Now that I've confirmed that the new action creators and reducer are working as
expected, I can turn my attention to adding the farmers related React
components...

First I'll stub out the components without any Redux related code, then I'll go
back and add-in the Redux store interactions...

Browse to the `redux-fruit-stand-examples` repo...
`fruit-stand-redux-with-react-multiple-reducers` folder... `component-stubs`
folder...

Copy and paste in the components sans the Redux code... review what each
component is doing and then add in the Redux related code...

`FarmerList`...

`Farmer`...

`FarmerHire`...

`FarmerManager`...

Update `App`...

```js
import React from 'react';
import FruitManager from './components/FruitManager';
import FarmerManager from './components/FarmerManager';

function App() {
  return (
    <>
      <h1>Fruit Stand</h1>
      <FruitManager />
      <FarmerManager />
    </>
  );
}

export default App;
```

Update the `FarmerList` component...

Import the `store` and the `payFarmer` action creator...

```js
import store from '../store';
import { payFarmer } from '../actions/farmersActions';
``` 

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

In the `render` method get the current farmers state...

```js
const { farmers } = store.getState();
```

Within the `pay` event handler, call the dispatch method on the store and pass
in a call to the payFarmer action creator...

```js
store.dispatch(payFarmer(id));
```

Update the `FarmerHire` component...

Import the `store` and `hireFarmer` action creator...

```js
import store from '../store';
import { hireFarmer } from '../actions/farmersActions';
```

In the `hireFarmerClick` event handler, call the store `dispatch` method and
pass in a call to the `hireFarmer` action creator...

```js
store.dispatch(hireFarmer(farmerName));
```

Test the app... everything seems to be working as expected...

I actually introduced a bug when I added the `farmersReducer` function...

```js
const farmersReducer = (state = {}, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case HIRE_FARMER:
      const farmerToHire = {
        id: action.id,
        name: action.name,
        paid: false
      };
      nextState[action.id] = farmerToHire;
      return nextState;
    case PAY_FARMER:
      const farmerToPay = nextState[action.id];
      farmerToPay.paid = !farmerToPay.paid;
      return nextState;
    default:
      return state;
  }
};
```

Notice that the `state` parameter is duplicated to the `nextState` variable
using the `Object.assign` method...

```js
let nextState = Object.assign({}, state);
```

While this code correctly creates a duplicate of the `state` object, `nextState`
is only a shallow duplicate as only the top-level object is duplicated. Each
"farmer" object that the `state` object refers to are still the same objects.

In the `PAY_FARMER` case clause, the farmer object is mutated by setting the
`paid` property to a new value...

```js
case PAY_FARMER:
  const farmerToPay = nextState[action.id];
  farmerToPay.paid = !farmerToPay.paid;
  return nextState;
```

I could update the `PAY_FARMER` case clause to use `Object.assign` to duplicate
the farmer object before I modify the `paid` property. The approach that I'm
going to use is to delegate farmer object state updates to a subordinate
reducer.

I'll define a `farmerReducer` function and update the `farmersReducer` function
to delegate farmer state updates to the `farmerReducer` function...

```js
// ./src/reducers/farmersReducer.js

import { HIRE_FARMER, PAY_FARMER } from '../actions/farmersActions';

const farmerReducer = (state, action) => {
  // State is a farmer object.
  switch (action.type) {
    case HIRE_FARMER:
      return {
        id: action.id,
        name: action.name,
        paid: false
      };
    case PAY_FARMER:
      return Object.assign({}, state, { paid: true });
    default:
      return state;
  }
};

const farmersReducer = (state = {}, action) => {
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case HIRE_FARMER:
      nextState[action.id] = farmerReducer(undefined, action);
      return nextState;
    case PAY_FARMER:
      nextState[action.id] = farmerReducer(nextState[action.id], action);
      return nextState;
    default:
      return state;
  }
};

export default farmersReducer;
```

<start teleprompter> Now the `PAY_FARMER` case clause delegates farmer state
updates to the `farmerReducer`, passing in the farmer object for the `action.id`
property value and the `action` parameter. The `farmerReducer` has a
`PAY_FARMER` case clause that correctly uses the `Object.assign` method to
duplicate the farmer object with the new `paid` property value.

Catching these kinds of state mutation bugs is difficult to do. Leveraging
patterns like reducer composition can help to prevent from introducing these
kinds of bugs in the first place.

JavaScript also provides an easy way to keep a reducer from mutating its
arguments. The `Object.freeze` method prevents new properties from being added
to an object, and also prevents properties currently on an object from being
altered or deleted. Essentially, it renders an object immutable. This is exactly
what you want when state changes, to force the reducer to return a new object.
<stop teleprompter>

I can call `Object.freeze` at the top of every reducer, you can ensure that the
state is never accidentally mutated...

```js
const farmerReducer = (state, action) => {
  // State is a farmer object.
  Object.freeze(state);
  // ...
};

const farmersReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  // ...
};
```

<start teleprompter> It's important to note that `Object.freeze` only performs a
shallow freeze, not a deep freeze. A shallow freeze only applies to the
immediate properties of the object itself. Nested objects can still be mutated,
so be careful. Because it's just a shallow freeze, using `Object.freeze`
wouldn't have exposed the earlier bug with mutating the farmer object. <stop
teleprompter>

`Object.freeze` also works with arrays...

```js
const fruitReducer = (state = [], action) => {
  Object.freeze(state);
  // ...
};
```

<start teleprompter> When an array is frozen with `Object.freeze`, its elements
can't be altered and no elements can be added to or removed from the array. Just
like with objects, freezing arrays has limitations. If the array's elements
containing objects, properties on those objects can still be mutated.

And that's it for this video! If you'd like to review the application shown in
this video, remember to check out the redux-fruit-stand-examples repo. <show
repo in the browser>

Thanks for watching and I'll see you next time!

[slides]: https://docs.google.com/presentation/d/1TjeQdHVD7HCJCC-h9XjvaA4GL4GHk3Noi1WyPJyBvtc/edit#
