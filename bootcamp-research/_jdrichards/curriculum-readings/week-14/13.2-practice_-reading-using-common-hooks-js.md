# Using State and Effect Hooks

Now, it's time to dig into the code and explore how the basic React hooks work
in function components.

After reading this article, you will be able to

* Create function components that use state
* Manage side effect operations in response to state or prop changes

Remember, if you need more information, please visit the official documentation 
for the [Hooks API Reference][hooks-ref].

## Using `useState`

As you've learned, **props** are variables that are passed into a component.
When the value of a prop is updated, the component re-renders.

A **state variable** is another kind of variable which causes rerenders. What 
makes a state variable special is that it is defined and updated WITHIN a 
component. FYI, the value of a state variable can be passed as a prop to child 
components.

In function components, **React** provides the `useState` hook to define both 
the variable and a function to set/update its value. Said another way... when 
you utilize the `useState` hook to set up a slice of state, you also set up a 
prospective function to update that slice of state. 

The `useState` hook returns an array of two properties. The first is the 
variable; the second, the function. It is common practice to name the function
the same as the variable starting with "set". Also, camelCase is preferred for
state variables, and their setter functions.

The `useState` hooks has one parameter which is the default value to assign to
the variable. It is optional and if not provided, will leave the variable's 
value as `undefined`.

### Example 1: Loading indicator

To begin, consider a simple boolean. As a plain JavaScript object, you could 
define one with code like `let loading = true;` and later update by assignment
using `loading = false;`.

This is happening "under the hood" with the `useState` hook, plus a whole lot 
more. Most notably every place in the Virtual DOM (which is ultimately the web 
page) that the variable is used gets redrawn whenever the value changes. This is
one of the biggest powers of the React framework — it handles all the 
complexities of writing to DOM objects on the webpage and allows you to focus
on the logic of when and why the updates should happen.

To define loading as a state variable, use the following syntax:

```javascript
const [loading, setLoading] = useState(true);
```

Often in components, `loading` is initialized to `true` while all the data and UI
is being figured out and displayed. Only after that's done will `loading` be set
to `false`.

```
setLoading(false)
```

You'll revisit loading later in this article.

### Example 2: Form input

Consider this function component with a state variable named `inputValue`. 
Notice that the default value can be the parameter of the `useState` hook.

```js
const FormWithHooks = () => {
  const [inputValue, setInputValue] = useState('Default input value here!');

  // More functionality
};
```

Any updates to `inputValue` will be made by calling `setInputValue`.

```js
const updateInputVal = e => setInputValue(e.target.value);
```

For example, ...

```js
const FormWithHooks = () => {
  const [inputValue, setInputValue] = useState('');
  const updateInputVal = e => setInputValue(e.target.value);

  return (
    <form>
      <input
        type="text"
        value={inputValue}
        onChange={updateInputVal}
        placeholder="Type something!"
      />
    </form>
  );
};
```

In general, React Hooks help you write clean code!

## Using `useEffect`

The `useEffect` hook is used to manage side-effect operations. In other words,
it can "watch" for changes to the values of variables, then run code for 
"effects" based on what it sees.

### Defining effects with the effect function

The first argument of the `useEffect` hook is a function, sometimes called the
_effect function_ or simply _effect_. It takes no arguments. Often developers 
simply declare it as an inline function (`()=> { /* do stuff here */ }`).

While this function must be synchronous, there are ways for the effects inside
to be asynchronous (more on this in a moment).

The effect function may return another function to be used for cleanup if the 
component is removed from the screen before the effect has completed (again, 
more on this momentarily).

However, the most important feature to understand and property utilize the 
`useEffect` is the second argument. So please read on...

### Skipping effects with the dependency array

This second argument of the `useEffect` hook is known as the _dependency array_.
You can optimize the performance for your component by using the dependency
array to skip effects. The dependency array is a collection of dependent
variables. The `useEffect` hook listens for changes to variables in the 
dependency array to determine whether or not to run the _effect_ again.

```js
useEffect(() => {
  // Side effect logic
}, [/* Dependency array */]);
```

### Three ways to invoke `useEffect`

The `useEffect` hook can be triggered or invoked in three ways changing the
timing of when the function runs.

A) When the `useEffect` hook is invoked **without** a second argument, the 
function will be invoked after every render:

```js
useEffect(() => {
  // Side effect logic invoked after every render
});
```

B) When the `useEffect` hook is invoked **with an empty array**, the function is
only invoked once, when a component mounts:

```js
useEffect(() => {
  // Side effect logic invoked once, when a component mounts
}, []);
```

When the `useEffect` hook is invoked **with an array of dependencies**, the
function is invoked whenever a dependency changes:

```js
useEffect(() => {
  // Side effect logic invoked every time the `dependentVariable` changes
}, [dependentVariable]);

useEffect(() => {
  // Side effect logic invoked when either `dependentA` OR `dependantB` changes
}, [dependentA, dependentB]);
```

### Asynchronous effects

You are familiar with using `async/await` to wait for asynchronous features such
as API calls. 

> Reminder: _React_ is a front-end framework so it will not talk to a database
> directly. Instead it could fetch data through an API hosted in _Express_ and 
> _Express_ would talk to the database. Some developers, especially in the 
> online community, get lazy and say "fetch from a database" while implying 
> using an API.

If you'd like to make an asynchronous fetch within a `useEffect` hook, you would
first declare an asynchronous function within the hook. Then, you would invoke 
the asynchronous function from within the hook.

```js
useEffect(() => {
  const fetchSomething = async () => {
    // Fetch call
  };

  fetchSomething();
}, [/* Dependency array */]);
```

The effect function passed in as the `useEffect` hook's first argument 
**cannot** be an asynchronous function. This is why you need to define and 
invoke the asynchronous function with the effect function's body.

### Asynchronous effect with dependency array

In the example below, the `useEffect` hook runs an asynchronous fetch of a
puppy, based on a `puppyId` input. Since the dependency array references the 
`puppyId` attribute on the `puppy` variable, the application will only fetch 
whenever the `puppyId` changes. This optimizes the code, because now the effect 
is only run upon the change of a specific variable - `puppyId`!

```js
useEffect(() => {
  const fetchPuppy = async (puppyId) => {
    const puppy = await fetch(`https://api.puppies.example/${puppyId}`);
    const puppyJSON = await res.json();
    return puppyJSON;
  };

  fetchData(puppy.puppyId);
}, [puppy.puppyId]);
```

Using a dependency array also prevents endless loops. Without the dependency
array, a fetch call invoked within a `useEffect` hook would constantly run and
your code would error out.

### Effect cleanup

In order to _cleanup_ an effect, you would need to return a function from within
the `useEffect` hook. This is important in asynchronous use cases where the 
component could be moved out of scope before the effect finishes.

```js
useEffect(() => {
  return function cleanup() {
    // Cleanup logic
  }
}, [/* Dependency array */]);
```

For example, maybe you have an animation that is running, and you want to wait
for it to complete before updating another part of the UI. A `setTimeout` can
do the waiting for you, but it would need to be cleaned up if it was running
when the user took a different action that navigates to a different part of your
application (for example).

```javascript
// "animating" could be a prop (as shown here) or in state (useState hook)
function MyComponent({animating}) {

  // The important point of this example - notice the use of "return"
  useEffect(() => {
    if (animating) {
      const tid = setTimeout(() => {
         // Do something after animation ...
         setAnimating(false)
       }, 2000);
     return () => clearTimeout(tid);
   }
  }, [animating]);

  // (Additional code and JSX omitted to focus on relevant hooks code)
}
```

The dependency array tells this to only be invoked when `animating` changes, and
the conditional limits it to only when animating is set to true. `This` prevents 
an infinite loop or double invoking of the effect function.

### Practical uses for `useEffect`

The `useEffect` hook is quite useful and important to function components. You
are likely to find many uses for it.

One example is data fetching. A user changes their search criteria causing your
component to call an API to get a different set of rows for a table.

Another example is when a state variable depends on the value of a prop. When 
the prop changes, the calculation for the state variable's value needs to be 
run again.

## What you have learned

In this article, you have learned about the general features of the basic React
hooks and two powerful and common hooks used in _React_ components.

* `useState` hook to manage a function component's state
* `useEffect` hook to manage running, skipping, and cleaning up effects


[hooks-ref]: https://reactjs.org/docs/hooks-reference.html
