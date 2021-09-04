# Function Component

In React, you can break down pieces of the virtual DOM into components. Using
JSX, you can create and assemble these components to create the virtual DOM that
will be rendered into real DOM.

In this article, you will learn how to:

* Create a React function component
* Nest a function component in another function component
* Organize components into their own modules
* Use the React.fragment component

## Create a Function Component

A React _function component_ is a function that returns a JSX element. The name
of the function is capitalized CamelCase by convention.

For example, a function component that renders a navigation bar and will return
a JSX element like so:

```js
function NavBar() {
  return (
    <nav>
      <h1>Pet App</h1>
      <ul>
        <li className="selected">
          <a href="/pets">Pets</a>
        </li>
        <li>
          <a href="/owners">Owners</a>
        </li>
      </ul>
    </nav>
  );
}
```

To convert this into real DOM, you can use the `ReactDOM.render` function and
use the `NavBar` component as a JSX element.

```js
// Get a DOM node for React to render to
const rootElement = document.getElementById('root');

// Give React the element tree and the target
ReactDOM.render(<NavBar />, rootElement);
```

Notice how the `NavBar` function component isn't called explicitly in the
code? Instead, it's wrapped in JSX tags and looks just like an HTML tag. This
will nest the real DOM converted from the `nav` JSX element returned from the
`NavBar` function in the real DOM element with the id of `root`.

Note: you cannot define HTML attributes when rendering a function component as
a JSX element: `<NavBar className="nav-bar" />` will not apply an HTML
attribute of `class` onto any of the rendered elements in `NavBar`.

### Showing nothing

You must return something from a function component. You **cannot return
`undefined` from a function component. React will not build correctly when
trying to render a component that returns `undefined`** If you don't want to
render anything from a component, then **return `null` instead**.

Here's an example of a function component, `ExampleComponent` rendering `null`
conditionally:

```js
const str = "hello";

function ExampleComponent() {
  if (str === "hello") return null;
  else return (
    <div>World!</div>
  )
}
```

When rendered, this component will not show anything on the page if `str` is
"hello". If str isn't "hello", the component will show a `div` with the text
"World!" inside of it.

## Nested Function Component

One of React's biggest strengths is that you can easily break down chunks of
rendered DOM elements into modular components.

To render a function component in another function component, you can apply the
same principle above. Wrap the desired nested function component in JSX tags
just like you would a regular HTML tag in the return of the outer function
component.

For example, let's say you wanted to separate out the navigation links in the
navigation bar above into another component but keep the links in the same place
in the virtual DOM. You would create a function component that renders just the
navigation links, and render that function component in the `NavBar` component
where the navigation links were.

```js
function NavLinks() {
  return (
    <ul>
      <li className="selected">
        <a href="/pets">Pets</a>
      </li>
      <li>
        <a href="/owners">Owners</a>
      </li>
    </ul>
  );
}

function NavBar() {
  return (
    <nav>
      <h1>Pet App</h1>
      <NavLinks />
    </nav>
  );
}
```

The `NavBar` component is the **parent** of the `NavLinks` component, which
means `NavBar` is rendering the `NavLinks` component as its **child**.

The virtual DOM created in this example is no different than the previous
example without nesting. Separating JSX elements will result in the same virtual
DOM outcome.

There are many reasons why you would want to break down a component into
smaller components. When looking at other's React code, ask yourself why the
components were broken down a certain way to better understand when you should
be breaking down your components.

## Component organization

When breaking down components into smaller components, you can also divide them
up into multiple files. In React, it's common to have one component per file
and export/import them when you need them in other components.

For example, `NavLinks` can be defined in a file called **NavLinks.js** and
exported from this file using ES6 module syntax.

```js
// NavLinks.js

function NavLinks() {
  return (
    <ul>
      <li className="selected">
        <a href="/pets">Pets</a>
      </li>
      <li>
        <a href="/owners">Owners</a>
      </li>
    </ul>
  );
}

export default NavLinks;
```

`NavBar` can also be defined in its own file called **NavBar.js**. To use the
`NavLinks` component, it can import it at the top of the file. It should also
export itself from this file.

```js
// NavBar.js
import NavLinks from './NavLinks.js';

function NavBar() {
  return (
    <nav>
      <h1>Pet App</h1>
      <NavLinks />
    </nav>
  );
}

export default NavBar;
```

Instead of holding all your components in one big JavaScript file, each
component has its own file and is organized and named in such a way that it's
easy to find the code for any component.

There are times when you would want to export multiple components from a file,
like related helper components, or define multiple components in a file, but you
should export only one. One component per file is not a hard rule, but a common
practice among React developers. Look out for instances where developer(s) chose
to break this practice and ask yourself why. This will help you learn when to
do the same.

## `React.fragment`

**React function components need to always return one JSX element as the
highest level tag.** There will be a React compilation error if there is more
than one outermost parent element returned from a function component.

Returning two `div` JSX elements like this will result in an error:

```js
// THIS COMPONENT WILL NOT WORK
function IncorrectComponent() {
  // returns two div tags (WILL NOT WORK)
  return (
    <div></div>
    <div></div>
  );
}
```

There are two ways to solve this issue. 1) wrap the elements in a parent element
like another `div`, but this would generate another real HTML element. 2) **wrap
the elements in a JSX element called `React.fragment` and no other real HTML
element will be created.**

Return two `div` JSX elements wrapped in `React.fragment`:

```js
import React from 'react';

function CorrectComponent() {
  // returns two div tags wrapped in React.fragment (WILL WORK)
  return (
    <React.fragment>
      <div></div>
      <div></div>
    </React.fragment>
  );
}
```

You can also return empty tags that will be read in JSX as `React.fragment`.

```js
import React from 'react';

function CorrectComponent() {
  // returns two div tags wrapped in empty tags (WILL WORK)
  return (
    <>
      <div></div>
      <div></div>
    </>
  );
}
```

## What you learned

In this article, you learned how to create a React function component that
renders a React JSX element. You also learned how to decompose a function
component into smaller function components, and you learned that it's common to
have one component per file when organizing your file structure. Finally, you
learned how to use the `React.fragment` component to render multiple top-level
elements.
