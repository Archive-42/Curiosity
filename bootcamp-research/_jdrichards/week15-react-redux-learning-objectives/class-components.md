# Week 15 Learning Objectives

## Class Components

- Recognize a React Class Component

A Class Component is a component that is defined using JavaScript Class syntax and extends the React.Component class from the react package.
To render elements in a Class Component, you must define a render method on the class. The return value of the render method is what will be rendered by the component.

```js
import React from 'react';

class ClassComponent extends React.Component {
  constructor(props) {
    super(props); // must be called if creating a constructor method
  }

  render() {
    return <div></div>;
  }
}
```

- Convert the use of component props in a Class Component to a Function - Component

```js
import React from 'react';

class MyComponent extends React.Component {
  render() {
    return (
      <>
        <h1>{this.props.title}</h1>
      </>
    );
  }
}
```

becomes

```js
function MyComponent(props) {
  return (
    <>
      <h1>{props.title}</h1>
    </>
  );
}
```

- Convert the use of component state in a Class Component to a Function - Component using useState

```js
class ClassComponent extends React.Component {
  constructor(props) {
    super(props); // must be called if creating a constructor method

    // Initialize the component state object
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <>
        <h1>{this.props.title}</h1>
        <div>{count}</div>
        <button
          onClick={() => this.setState((state) => ({ count: state.count + 1 }))}
        >
          Increment
        </button>
      </>
    );
  }
}
```

becomes

```js
import { useState } from 'react';

function FunctionComponent({ title }) {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>{title}</h1>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
}
```

- Understand what lifecycle methods are, the types of lifecycle methods, and when they are called when a Class Component is rendered

Lifecycle methods of a Class Component are methods that will be invoked after the rendering of a component. There are three types of lifecycle methods. componentDidMount will only run once, after the component's first render. componentDidUpdate will run after every render that isn't the first render. componentWillUnmount will run right before the component is removed from the component tree.

- Convert the use of lifecycle methods in a Class Component to a Function

```js
import React from 'react';

class ClassComponent extends React.Component {
  constructor(props) {
    super(props); // must be called if creating a constructor method

    // Initialize the component state object
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ count: 0 });
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log('hello world!');
    }
  }

  componentWillUnmount() {
    console.log('cleanup');
  }

  render() {
    return (
      <>
        <div>{count}</div>
        <button
          onClick={() => this.setState((state) => ({ count: state.count + 1 }))}
        >
          Increment
        </button>
      </>
    );
  }
}
```
