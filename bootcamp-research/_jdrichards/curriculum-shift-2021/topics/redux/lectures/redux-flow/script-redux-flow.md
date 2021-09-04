# Redux Flow

**Create a new Redux Flow video that uses debugger statements to highlight the
Redux flow and prompts students to predict what the next step will be.**

## Notes

* Instead of submitting a comment (as mentioned below), use a Fruit Stand
  example as the example to walkthrough
  * Use the code in either the `fruit-stand-redux-with-react-official-bindings`
    or `fruit-stand-redux-with-react-middleware-thunks` example in the
    https://github.com/appacademy-starters/redux-fruit-stand-examples repo
* Place `debugger` statements (or breakpoints) within key functions
* Debug the application and prompt the student to determine what the next step
  in the Redux cycle will be
* Place the available options on screen using overlay text

---

Feedback from Justin Meyer:

"An exercise which was invaluable to me as a student and I’ve found is extremely
helpful to students is forcing them to verbalize the entire React-Redux cycle
for a user executed event. When students have to verbalize a full React-Redux
cycle this forces them identify and confront any gaps in their understanding.
This exercise is usually done towards the end of the React-Redux portion of the
curriculum and when answering questions from pairs. However, I think this can
make a great lecture video as a debugger waterfall. This can be expanded by
including explicit points in the video where students are presented with several
options of what will be the next step of the react-redux cycle. A typical way to
demystify the react-redux cycle is by focusing on how createStore, connect, and
Provider are connected to dispatch and the root reducer. An example:

A user submits a comment and that comment is populated on the webpage. Ask
students the following:

* Where that event is handled in the react component
* What is being invoked when the user does this action (props from mdp)
* How the action is created (imported action creators)
* What causes that action to get dispatched (mdp)
* How we get dispatch in mdp (react-redux connect)
* How dispatch connects the action to the root reducer (createStore)
* How the action is delegated to the reducers (combineReducers)
* How the reducers connect to the store (createStore)
* What happens when the store changes (msp)
* And the eventual re-render of the webpage."

## Video

Before recording, setup 4 breakpoints:

* __src/components/FruitQuickAdd__ line 5 (`add(event.target.innerText);`)
* __src/components/FruitManagerContainer__ line 18 (`dispatch(addFruit(fruit))`)
* __src/reducers/fruitReducer__ line 7 (`return [...state, action.fruit];`)
* __src/components/FruitList__ line 8 (`return(<li key={index}>{fruitName}</li>)`)

Configure search to look only at *.js files

Setup simple debugging in VS Code (__./vscode/launch.json__)

```plaintext
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "React",
            "type": "chrome",
            "request": "launch",
            "url": "http://localhost:3000",
            "webRoot": "${workspaceFolder}/src"
        },
        {
            "name": "Express",
            "type": "chrome",
            "request": "launch",
            "url": "http://localhost:8080",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
```

Based on info found here:
https://medium.com/@auchenberg/live-edit-and-debug-your-react-apps-directly-from-vs-code-without-leaving-the-editor-3da489ed905f]



### Rough outline

* (Standard Intro) ... exploring Redux flow triggered by the "APPLE" button
* Q: Where is the event going to be handled?
   * Click APPLE button in browser
   * A: In the React component (specifically, __FruitQuickAdd__)
* See `add` prop, think about parent chain
* Q: What is being invoked?
   * Click **PLAY** in debug controls
   * A: `mapDispatchToProps`
* See the action `addFruit`
* Q: How is this action created?
  * Scroll up
  * A: imported action creator
* Q: What causes this action to get dispatched?
  * Scroll down
  * A: `mapDispatchToProps`
* Q: How does dispatch get sent to mapDispatchToProps?
  * Scroll down
  * A: `connect`
* Q: How is dispatch connected to the proper reducer?
  * Talk about Redux setup & configuration while you...
  * Search for **Provider**
  * Click result with `<Provider` to open __index.js__
  * See `store` passed to Provider
  * Option+Click (on Mac or Ctrl+click on Windows) "store" in `import store ...`
    to open __rootReducer__
  * A: `createStore`
* Q: How are actions delegated to reducers?
  * Option+Click (or Ctrl+Click) on `rootReducer`
  * A part 1: `combineReducers`
  * Click **PLAY** in debug controls
  * A part 2: `switch` in __fruitReducer__
* See where state modified
* Q: How does the reducer connect to the store?
  * Open __src/store.js__ in project list
  * A: `createStore`
* Q: What happens when the store changes?
  * Open __src/components/FruitManagerContainer.js__ in project list
  * A: `mapStateToProps`
* Use Option+Click (or Ctrl+Click) to follow props for UI updated
  * `(FruitManager)`
  * `<FruitList`
  * Click **PLAY** in debug controls
  * See `li` calculation
  * Click **PLAY** in debug controls
  * See update in browser
* Follow flow with ORANGE w/o detours
  * Click **ORANGE** button in browser
  * See handler
  * Click **PLAY** in debug controls
  * See dispatch
  * Click **PLAY** in debug controls
  * See reducer
  * Click **PLAY** in debug controls
  * See UI update
  * Click **PLAY** in debug controls (twice because there are 2 items)
  * See browser update
* (Standard closing)
