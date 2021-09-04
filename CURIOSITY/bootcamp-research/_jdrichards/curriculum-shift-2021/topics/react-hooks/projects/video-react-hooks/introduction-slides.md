
# React Hooks Introduction

---

## What are hooks?

* Functions that allow components to utilize React features without lifecycle
  methods
* Extract stateful logic from a component to be independently tested and reused
* Basic hooks: `useState`, `useEffect`, and `useContext`

Note:

* Hooks are functions that allow components to utilize React features without
  lifecycle methods.
* They can be used to extract stateful logic from a component to be
  independently tested and reused.
* In the React documentation, you'll see that there are three basics hooks and
  that you can create custom hooks as well.
* Today, you'll be learning about how to use the basic `useState`, `useEffect`,
  and `useContext` hooks!

---

## useState

```js
const [inputValue, setInputValue] = useState('Default input value here!');
```

* Set and name a default slice of state without a `constructor()` method
* Update a slice of state with `setInputValue`, instead of the `setState()`
  method

Note:

* In this example, the `useState()` hook replaces the need to use a constructor
  method to declare a default state.
* You can use the `setInputValue` function to replace the need to call
  `this.setState()` to update the `inputValue`
* You can also simply reference `inputValue` throughout the component, instead
  of `this.state.inputValue`
* The `useState` hook does a great job of cleaning up your code of a component's
  state management!


---

## useEffect

```js
useEffect(() => {
    // Side effect logic
}, [/* Dependency array */]);
```

* Side effect operations (i.e. data fetching)
* Optimize performance by using the dependency array to skip effects

Note:

* Now, you can use the `useEffect` hook to manage side effect operations, for
  example, data fetching.
* The `useEffect` hook will automatically run, similarly to the
  `componentDidMount` or `componentDidUpdate` lifecycle methods.
* You can optimize performance by using the dependency array to skip effects

---

## useEffect

```js
useEffect(() => {
     const search = async (searchQuery) => {
         // Asynchronous fetch logic
     };
     
     search(searchQuery);
  }, [searchQuery]);
```

Note:

* For example, imagine you have an asynchronous fetch call that takes in user
  input for a search query.
* You'll declare an asynchronous function to be called, within the first
  parameter of your `useEffect` hook.
* We'll refer to this fetch call as an "effect".
* Then you would have an array of dependent variables as the second parameter of
  your `useEffect` hook.
* This way, your `useEffect` hook is listening for changes to those variables,
  to determine whether or not to run the fetch `effect` again.
* This helps optomize your code - now your application only fetches when the
  `searchQuery` changes!

---

## useContext

```js
const context = useContext(MyContext);
```

* Read and subscribe to context changes
* Replaces the `static contextType` property in class components
* `<Context.Provider>` is still used to set the context's `value`


Note:

* You can also use the `useContext` hook to access a context object.
* Using the hook to declare a context variable is similar to using the `static
  contextType` property to make a `this.context` object available.
* Now that we've gone over a brief introduction of what hooks are and the
  features of React's basic hooks, you're ready to refactor class components
  that use lifecycle methods to function components that use React Hooks!
