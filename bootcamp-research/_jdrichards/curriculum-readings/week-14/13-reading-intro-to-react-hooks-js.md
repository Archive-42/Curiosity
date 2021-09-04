# Intro to React Hooks

React Hooks are a way for function components to manage state and the component 
lifecycle. In short, they control when parts of the DOM are rerendered (a.k.a.
redrawn) to reflect text, color, layout or other changes to the display. Some 
kinds of hooks are helpful in extracting stateful logic from a component to be 
independently tested and reused.

After reading this article, you will:

* Have a working knowledge of basic React hooks
* Understand how the basic Hooks connect to the React component lifecycle 
  (rendering and rerendering)

You'll begin at the conceptual level, before digging into the code.

## What are hooks?

A *Hook* is a special function that lets you “hook into” React features. Hooks 
let developers use state and other React features directly in a function 
component, without writing a class. In a sense, a hook "listens" for changes in
order to trigger a response.

Hooks solve a wide variety of seemingly unconnected problems in __React__.

* Attach reusable behavior to a component
* Extract stateful logic from a component for independent testing and reuse
* Split one component into smaller functions based on related pieces
* Simplify understanding and architecture

People can understand props, state, and top-down data flow perfectly well, but 
sometimes struggle with classes. Function components with hooks combine the
benefits of *Object-Oriented Programming*, such as encapsulation and 
abstraction, with an easy-to-follow implementation.

React wasn't built with hooks; they are a more recent development. You can read
about the [Motivation for Hooks][motivation-docs] in the official documentation.

### State Hooks

*What does calling `useState` do?* It declares a “state variable”. This is a way 
to “preserve” some values between the function calls (for a function component, 
that means rerenders). Normally, variables “disappear” when the function exits, 
but state variables are preserved by React.

*What do you pass to `useState` as an argument?* The only argument to the 
`useState()` hook is the initial state. You can keep a number, a string, an 
object, an array, etc. - whatever you need. (If you want to store two different
values in state, you would call `useState()` twice.)

*What does `useState` return?* It returns a pair of values: the current state, 
and a function that updates it. This is why developers typically write 
`const [count, setCount] = useState()`.

More information is available in the [Official Docs][state-docs].

### Effect Hooks

In React components, the render method itself shouldn’t cause side effects. It 
would be too early! Typically, you want to perform effects AFTER React has 
updated the DOM. That's what the `useEffect` hook helps you do.

*What does calling `useEffect` do?* By using this Hook, you tell *React* that 
your component needs to do something after render. React will remember the 
function you passed (referred to as "the effect"), and call it later after 
performing the DOM updates. In this effect, we set the document title, but we 
could also perform data fetching or call some other imperative API.

*Why is `useEffect` called inside a component?* Placing `useEffect` inside the 
component allows you to access any state variable or prop right from the effect.
You don’t need a special API to read it — it’s already in the function scope.

*Does `useEffect` run after every render?* Yes! By default, `useEffect` runs 
both after the first render and after every update (rerender). React guarantees 
the DOM has been updated by the time it runs the effects. It is possible to run
your effect only when certain variables change (using the second argument).

*What do you pass to `useEffect` as an argument?* The first and only required
argument is the function to call. Many times, however, you'll also want to
include the second argument which is an array of variables that the function 
depends on. This optimises performance by rerunning the effect only when 
necessary.

*What does `useEffect` return?* Nothing itself. However, if your function has
an async aspect, you will want to have it return a way to cancel the 
asynchronous task. (More on this later.)

More information is available in the [Official Docs][effect-docs].

### Other Hooks

*React* has a number of additional hooks built-in. Some you will study and use
in your projects. Others you will not need until you run into the special case
that requires them.

Here's a quick overview of the most used ones. For details on how to use them,
as well as additional hooks not listed here, please visit the official 
documentation for [Hooks API Reference][hooks-ref].

* `useCallback` - This allows you to wrap a function definition, so it only gets 
  remade when certain values change (rather than on every single rerender).
* `useContext` - Allow you read a context and subscribe to its changes. You will
  study this soon!
* `useRef` - A mutable (that is, changeable) ref object often used to store a
  pointer to dom elements. You will have the opportunity to explore this later 
  in this course.
* `useReducer` - Alternative to `useState` for cases where you have complex 
  objects and want to optimize performance. In this course, you'll use a library
  called *Redux* which provides this functionality - and much more!

## What you have learned

In this article, you have learned that hooks allow developers to "hook into" 
into *React* features to listen for and respond to variable changes. The two
most common hooks are `useState` which gives you persistent variables, and 
`useEffect` which responds to DOM changes (rerenders).


[motivation-docs]: https://reactjs.org/docs/hooks-intro.html#motivation
[state-docs]: https://reactjs.org/docs/hooks-state.html
[effect-docs]: https://reactjs.org/docs/hooks-effect.html
[hooks-ref]: https://reactjs.org/docs/hooks-reference.html
