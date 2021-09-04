# React Widget Routes

Today you're going to add routing to a widgets application. You'll be using
`<BrowserRouter>` to add routes and links to your clock, folder, weather, and
search widgets.

By the end of this project, you will:

- Know how to set up a new React Router;
- Be able to add navigation to React components;
- Understand route precedence when using `<Switch>`; and
- Be able to conditionally redirect users to different components.

## Phase 1: Setup

Start by cloning the solution of the Widgets project you previously built:

```sh
git clone https://github.com/appacademy-starters/widget-routes-starter.git
```

Take a moment to install the `react-router-dom` package:

```sh
npm install react-router-dom@^5.0.0
```

Now you're going to set up your project to use React Router! 

Right now, your `Root` component is rendering a `Clock` component, a `Folder`,
component, a `Weather` component, and an `AutoComplete` component. You're going
to refactor the `Root` component to apply the React Router to your Widgets
project!

Begin creating a `Widgets` component to house your routes. For now, have it
render a parent `<div>` with a `<h1>` title of "Widgets":

```js
// Widgets.js
import React from 'react';

const Widgets = () => (
  <div>
    <h1>Widgets</h1>
    {/* TODO: Your routes here */}
  </div>
);

export default Widgets;
```

Begin by importing `BrowserRouter` from `react-router-dom` in your `Root.js`
file. Then import and render your new `Widgets` component in your `Root`
component. Apply the router to your project by wrapping the `<Widgets>`
component with `<BrowserRouter>` tags. Your `Root` component should look
something like this:

```js
const Root = () => (
  <BrowserRouter>
    <Widgets />
  </BrowserRouter>
);
```

As a reminder, wrapping `<Widgets>` with your `<BrowserRouter>` simply allows
your application to have access to the `react-router-dom` package and use its
`<Route>`, `<Link>`, `<NavLink>`, `<Switch>`, and `<Redirect>` components.

Now you can set up routes for each of your widgets!

## Phase 2: Adding routes

Begin by importing `Route` from `react-router-dom` into your `Widgets.js` file:

```js
import { Route } from 'react-router-dom';
```

Now, your `Root` component will act as the home page or default path (`/`) of
your application. You will create the following routes for your `Clock`,
`Folder`, `Weather`, and `AutoComplete` widgets!

| URL Path        | Components     |
| --------------- | -------------- |
| `/clock`        | `Clock`        |
| `/folder`       | `Folder`       |
| `/weather`      | `Weather`      |
| `/autocomplete` | `AutoComplete` |

Begin by importing `Route` from `react-router-dom` and each component to render
into your `Widgets.js` file. Take a note at the ESLint errors in your console.
Unused imported generate ESLint warnings. Remove the imports from your
`Root.js` file to remove the ESLint warning.

## Phase 3: Threading props

Now you should see that you have two errors error when navigating
`http://localhost:3000/`. The first error indicates that `this.props.folders` is
undefined. This is because you did not thread the `folders` prop from your
`Root.js` file to your `Folder` component.

From your `Root.js` file, pass in the `folders` array and `names` array as
props into your `<Widgets>` component:

```js
const Root = () => (
  <BrowserRouter>
    <Widgets folders={folders} names={names} />
  </BrowserRouter>
);
```

Now update your `Widgets` component to take in and destructure its props:

```js
const Widgets = ({ folders, names }) => (
  <div>
    <h1>Widgets</h1>
    {/* Your routes here */}
  </div>
);
```

Now you'll need to thread the `folders` prop to your `Folder` component. In
order to do so, you'll need to use the a `render` prop instead of a `component`
prop in your `<Route>`. You can thread props through inline rendering of the
component.

For example, to create a route for the `<Folder>` component while passing in a
`folders` prop, you could directly render the `<Folder>` component while
creating the route:

```jsx
<Route path="/folder" render={() => <Folder folders={folders} />} />
```

Note that your `AutoComplete` component expects to be passed the `names` prop.
Create a route to render the `AutoComplete` component while threading through
the prop.

Take a moment to check your routes! Navigate to `http://localhost:3000/folders`
to view your `Folder` component.

## Phase 4: Switching between your routes

Now you're going to determine the order of your routes! You will use the
`<Switch>` component to do so. As a reminder, using `<Switch>` allows you to
only render one `<Route>` even if several match the current URL. You can
multiple `<Route>` within `<Switch>` tags, but only the first one that matches
the current URL will be rendered.

Begin by importing `Switch` from `react-router-dom` and wrapping your routes
with `<Switch>` tags like so:

```js
const Widgets = ({ folders, names }) => (
  <div>
    <h1>Widgets</h1>    
    <Switch>
      {/* Your routes here */}
    </Switch>
  </div>
);
```

Create a new route for to `/`. Within this route, render a `Welcome to your
widgets app!` message in `<h1>` tags. Think of the order of where this route
will be placed.

Now add another route to render a `404: Page not found` message. Use inline
rendering to render the message in `<h1>` tags. Think of where your default
route is placed, in terms of ordering within the `<Switch>` tags.

Take a moment to check whether any of your routes need to have the `exact` flag
set to ensure the rendering of a single route and component. Now test your
routes! Navigate to a path that is not specified in your route to render your
default `404: Page not found` message.

## Phase 5: Adding navigation links

Lastly, add some navigation links to your project! Begin by creating a `<nav>`
element to house your navigation items underneath the `<h1>` header of your
`Widgets` component. Within the `<nav>` element, create a `<Link>` for each of
your routes. Remember that your header and navigation bar will always render at
the top of your page, while your routes determine the component is rendered
beneath.

Make links for the following paths: `/`, `/clock`, `/folder`, `/weather`, and
`/autocomplete`.

```js
const Widgets = ({ folders, names }) => (
  <div>
    <h1>Widgets</h1>
    <nav>
      {/* Your links here */}
    </nav>
    <Switch>
      {/* Your routes here */}
    </Switch>
  </div>
);
```

Remember that `NavLink` components allow you to set an `activeClassName` to
style the link for when the browser has navigated to the link's path. By
default, each `NavLink` component's `activeClassName` is set to `active`. Take a
moment to refactor your `Link` components to be `NavLink` components and create
an `.active` class in your CSS file to style your links!
