
# React Router Introduction

Now that you know how to render components in a React app, how do you handle
rendering components only on specific URL paths to simulate navigating through
different webpages on a single page app? React Router is the answer!

Think of how you have created server-side routes in Express. Take the following
URL and server-side route. Notice how the `/users/:userId` path corresponds with
the `http://localhost:3000/users/2` URL to render a specific HTML page.

```js
// http://localhost:3000/users/2
app.get('/users/:userId', (req, res) => {
  res.render('userProfile.pug');
});
```

In the default React setup, you lose the ability to create routes in the same
manner as in Express. This is what React Router aims to solve!

[React Router] is a frontend routing library that allows you to control which
components to display using the browser location. A user can also copy and paste
a URL and email it to a friend or link to it from their own website.

When you finish this article, you should be able to use the following from the
`react-router-dom` library:

* `<BrowserRouter>` to provide your application access to the `react-router-dom`
  library; and
* `<Route>` to connect specific URL paths to specific components you want
  rendered; and
* `<Switch>` to wrap several `Route` elements, rendering only one even if
  several match the current URL; and
* React Router's `match` prop to access route path parameters.

## Getting started with routing

Since you are writing single page apps, you don't want to refresh the page each
time you change the browser location. Instead, you want to update the browser
location and your app's response using just JavaScript. This is known as
client-side routing. You are using React, so you will use React Router to do
this.

Create a simple react project template with npm:

```sh
npx create-react-app my-app --template @appacademy/react-v17 --use-npm
```

Change directory into my-app and install React Router:

```sh
cd my-app && npm install --save react-router-dom@^5.1.2
```

Start the React development server at `http://localhost:3000`:

```sh
npm start
```

Now import `BrowserRouter` from `react-router-dom` in your entry file,
`src/index.js`:

```js
// ./src/index.js
import { BrowserRouter } from 'react-router-dom';
```

### BrowserRouter

`BrowserRouter` is the primary component of the router that wraps your route
hierarchy. It makes routing information from React Router available to all its
descendent components. For example, if you want to give `<App>` and all its
children components access to React Router, you would wrap `<App>` like so:

```js
// ./src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const Root = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
```

Now you can route the rendering of certain components to certain URLs (i.e
`https://www.website.com/profile`).

### HashRouter

Alternatively, you could import and use `HashRouter` from `react-router-dom`.
Links for applications that use `<HashRouter>` would look like
`https://www.website.com/#/profile` (with a `#` between the domain and path).

You'll focus on using the `<BrowserRouter>`. `<HashRouter>` is primarily used
in legacy code or for sites that need to be compatible with legacy browsers.

## `<Route>` component

React Router helps your React application render specific components based on
the URL path. The React Router component you'll use most often is `<Route>`.

The `<Route>` component is used to wrap another component, causing that
component to only be rendered if a certain URL is matched. The behavior of the
`<Route>` component is controlled by the following props: `exact` and `path`.

The `App` component at `App.js` is returning `<h1>Hello world!</h1>`. Change
the rendered text to be `Hello from App!`. Create a simlar component `Users`
that returns `<h1>Hello from Users!</h1>`. Add a `components` folder in the
`src` folder and make a file called `Users.js`. The `Users.js` file should look
exactly like `App.js` except with different text.

Now let's refactor your `index.js` file so that you can create your routes
within a `Root` component. First, run your imports. You'll need the `App` and
`Users` component along with the `BrowserRouter` and `Route` components from
`react-router-dom`.

```js
// ./src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import Users from './components/Users';
```

```js
const Root = () => {
  return (
    <BrowserRouter>
      <div>
        {/* TODO: Routes */}
      </div>
    </BrowserRouter>
  );
};
```

Finally, connect the `Root` component in `ReactDOM.render` instead of `App`.

```js
ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
```

Put it all together and you've got a dynamic browser routing component.

Note that BrowserRouter can only have a single child component, so the snippet
above wraps all routes within parent a `<div>` element.

Now let's create some routes!

### `<Route>`

Your `Root` component should render the `App` component at the root path of `/`.
Do this by wrapping `App` with a `Route` containing a `path` prop set to `/`.

```js
// ./src/index.js
// ...
const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path="/">
          <App />
        </Route>
      </div>
    </BrowserRouter>
  );
};
// ...
```

Navigate to `http://localhost:3000`. And you should see the text, "Hello from
App!"

Next, render the `Users` component at the path of `/users`.

```js
// ./src/index.js
// ...
const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path="/">
          <App />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
      </div>
    </BrowserRouter>
  );
};
// ...
```

The wrapped component `App` will only be rendered when the path is matched. The
path matches the URL when it matches some initial portion of the URL. For
example, a path of `/` would match both of the following URLs: `/` and `/users`.
(Because `/users` begins with a `/` it matches the path `/`)

```jsx
<Route path="/">
  <App />
</Route>
<Route path="/users">
  <Users />
</Route>
```

Add these components in the commented out `TODO` section in your entry file.

Take a moment to navigate to `http://localhost:3000/users` to see both "Hello
from App!" and "Hello from Users!" which means both the  `App` component and
`Users` component are rendering at the path of `/users`.

If you navigate to a route NOT beginning in `/users`, like `/test`, then you
should only see the `App` component rendered.

### `exact` prop

If this `exact` flag is set as a prop in the `Route` component, the path will
only match when it **exactly** matches the URL. Then browsing to the `/users`
path would no longer match `/` and only the `Users` component will be rendered
(instead of both the `App` component and `Users` component).

```jsx
<Route exact path="/">
  <App />
</Route>
<Route path="/users">
  <Users />
</Route>
```

Navigate to `http://localhost:3000/users` to see only the "Hello from Users!"
which means only the `Users` component is rendering at the path of `/users`.
The `App` component will now only render at **exactly** the path of `/`.

### Path params and `useParams`

A component's props can also hold information about a URL's parameters. The
router will match route segments starting at `:` up to the next `/`, `?`, or
`#`. Such segments are _wildcard_ values that make up your route parameters.

For example, take the route below:

```jsx
<Route path="/users/:userId">
  <Profile />
</Route>
```

The router would break down the full `/users/:userId/photos` path to two parts:
`/users`, `:userId`.

The `Profile` component can access to the `:userId` part of the
`http://localhost:3000/users/:userId/photos` URL through a function given by
React Router called `useParams`. `useParams` returns information about all the
wildcard values in your route parameters.

To use it, simply import the `useParams` function from `react-router-dom` and
call it inside of a React component. It returns a `params` object. For example:

```js
import React from 'react';
import { useParams } from 'react-router-dom';

function Example() {
  const params = useParams();
}
```

The `params` object would then have a property of `userId` which would hold the
value of the `:userId` _wildcard_ value. Let's render the `userId` parameter in
a user profile component. Take a moment to create a `Profile.js` file in the
`components` folder with the following code:

```js
// ./src/components/Profile.js
import React from "react";
import { useParams } from 'react-router-dom';

const Profile = () => {
  const params = useParams();
  const { userId } = params;

  return <h1>Hello from User Profile {userId}!</h1>
}

export default Profile;
```

In a real world application, you would use this wildcard to make and AJAX call
to fetch the user information from the database and render the return data in
the `Profile` component. Recall that your `Profile` component was rendered at
the path `/users/:userId`. Thus you can use your `userId` parameters to fetch a
specific user.

The `useParams` function is a specific type of function used in React components
called **hooks**. Hooks are functions that give a component access to data
that doesn't need to be passed down directly by the parent component. They also
help manage the flow of data across the multiple renders of a React component.
You'll see more examples of React Router and React hooks later this week.

## What you learned

In this article, you learned how to use the `BrowserRouter` and `Route`
components from the React Router library. You also learned how to create routes
to render specific components at different URL paths and manage the order of
the routes. You learned how to use the `exact` prop flag on a `Route` component
to ensure that only the specified path renders specified component. Finally,
you learned how to use the `useParams` hook from the React Router library to
access the params of the URL path to get the path's wildcard values.

To learn more about the `Route` component, see the [docs on Route]. To learn
more about the React Router hooks, specifically, `useParams`, see the
[docs on useParams].

[React Router]: https://github.com/ReactTraining/react-router

[docs on Route]: https://reactrouter.com/web/api/Route
[docs on useParams]: https://reactrouter.com/web/api/Hooks/useparams
