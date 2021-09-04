# Refactoring React Class Components


* Refactor --- Use the `useState` hook to update state, instead of the `setState()` method.

* Use the `useState` hook to set a default state, instead of setting the default
  state in a `constructor()` method.


* Use the `useEffect` hook in replacement of commonly used component lifecycle
  methods (`componentDidMount`, `componentDidUpdate`, and
  `componentWillUnmount`).

  * Use the `useContext` hook to access a context object, instead of a
  `Context.Consumer` or the `static contentType` property.



* Describe what a higher-order component (HOC) is
* Write a higher-order component (HOC) that accepts a component as an argument
  and returns a new component

  * Describe a situation where defining multiple containers for a single component
  is advantageous
