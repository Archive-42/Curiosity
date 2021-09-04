_(lecture Slides to be used with [AppAcademySlides](https://appacademy.github.io/slides/#/) site for Instructor reference. )_

# W15D2 
#### Redux Continued

![](https://seeklogo.com/images/R/redux-logo-9CA6836C12-seeklogo.com.png)
---
## Agenda pt 1
1. The Redux Cycle

2. How to set up Redux with React 
	- Video Code Along
  
---
## Agenda Cont.
3. How to set up Preloaded State in a React/Redux app
	- Video Code Along
  
4. Having Good Reducer Design (Splitting them up)
	- Video Code Along
 
5. Introducing Container Components (for use with Redux)
	- Video Code Along
  
---
### The Redux Cycle: the key players

1. Views / front end / React components

1. Action Creator Functions 

1. The Store AKA
    - `reducers`
    - `state` 
    - `dispatch function`
---
### The Redux Cycle: visualized 

![](https://cdn-images-1.medium.com/max/2000/1*QxZJEXWhsS-YuG5SZsRgjA.png)

---

### The Redux Cycle

0. User interacts with website 
  
1. Triggers a Redux _Action_, defined using Redux's `store.dispactch()` function which invokes the _Reducers_
 

3. The Reducers & Action Type work together to determine and return a state change
  
4. Once the state in the Redux store changes, because react components are subscribed to Redux state, front end will re-render


---
### The Redux Cycle
1. User clicks **`Create Comment`** button 
2. Button has an **`onClick`** listener, in which an **`addComment()`**
Action Creator gets dispatched. 
3. dispatch invokes the **`commentsReducer`** with the current state and the **`ADD_COMMENT`** action type. 
4. Reducer returns a new state, in which the store update's the state. 
```javascript
store.getState() => { comments: { 1: "my new comment!"}}
```
5. This state change is picked up by React component that is subscribed to this state
6. React re-renders and now we see the comment display on the page. 

---

### The Redux Cycle Animated

![Cycle](https://res.cloudinary.com/practicaldev/image/fetch/s--m5BdPzhS--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://i.imgur.com/riadAin.gif)

---
## Set up Redux w/ React App

#### Video Code Along

---
## Redux Flow / Setup

1. Action types
1. Actions
1. Reducer(s)
1. Initialize store
---
## Preloaded State 

#### Video Code Along

---
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
---
```js
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

---
## Seperate Reducers 
### (Introducing Root Reducer)

#### Video Code Along

---
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
---
### Container Components 

#### Video Code Along

---
### Container is just a component 
- Not presentational (minimal jsx)
- Preserves 'Seperation of Concerns' 
- For the purpose of mapping over Action Creators & Carving necessary slice(s) of state

---

# Thank you!
 _Lots of material today - normal to feel overwhelmed_ 🥵


