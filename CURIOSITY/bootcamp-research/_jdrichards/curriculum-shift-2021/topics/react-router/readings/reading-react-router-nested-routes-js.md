
# React Router Nested Routes

Now you know how to create front-end routes and add navigation with React
Router. When initializing Express projects, you declare static routes. Static
routes are routes that are declared when an application is initialized. When
using React Router in your application's initialization, you can declare dynamic
routes. React Router introduces dynamic routing, where your routes are created
as your application is rendering. This allows you to create nested routes within
components!

In this article, let's dive into [nested routes]! When you finish the article,
you should:

* Describe what nested routes are
* Be able to use React Router to create and navigate nested routes
* Know how to use the React Router `useLocation` hook to generate links and
  routes

## Why nested routes?

Let's begin with why you might need nested routes. As you remember, you are
using React to create a single-page application. This means that you'll be
organizing your application into different components and sub-components.

For example, imagine creating a simple front-end application with three main
pages: a home welcome page (path of `/`), a users index page (path of `/users`),
and user profile pages (path of `/users/:userId`). Now imagine if every user had
links to separate `posts` and `photos` pages.

You can create those routes and links within the user profile component instead
of creating the routes and links where the main routes are defined.

## What are nested routes?

Now let's dive into a user profile component to understand what nested routes
are. Imagine you have a route in your application's entry file to each user's
profile like so:

```jsx
<Route path="/users/:userId">
  <Profile />
</Route>
```

This means that upon navigating to `http://localhost:3000/users/1`, you would
render the following `Profile` component and the `userId` parameter from the
`useParams` hook would have the value of `"1"`.

```js
// ./src/components/Profile.js
import React from "react";
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();

  return <h1>Hello from User Profile {userId}!</h1>
}

export default Profile;
```

What if you wanted to render the photos of the user on the `Profile` component
at the `/users/:userId/photos` path, or an about me section at the
`/users/:userId/about-me` path, then you can render `<Route>` components on the
in `Profile` like so:

```js
// ./src/components/Profile.js
import React from "react";
import { Route, Link, useParams } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();

  return (
    <>
      <h1>Hello from User Profile {userId}!</h1>
      <Link to={`/users/${userId}/photos`}>Photos</Link>
      <Link to={`/users/${userId}/about-me`}>About Me</Link>

      <Route path="/users/:userId/photos">
        <h2>Photos for {userId}</h2>
      </Route>
      <Route path="/users/:userId/about-me">
        <h2>About Me for {userId}</h2>
      </Route>
    </>
  );
}

export default Profile;
```

Since this route is not created until the `Profile` component is rendered, you
are dynamically creating your nested `/users/:userId/photos` and
`/users/:userId/about-me` routes.

Navigate to `http://localhost/users/8`. You should see links to the photos and
the about me for the user with an id of 8. "Hello from Profile 8" should never
change when switching between the `/users/8/photos` and `/users/8/about-me`
paths, but you'll see the text below it change.

## `useRouteMatch` hook

Currently, the `<Link>`'s `to` prop, and the `<Route>`'s `path` prop in the
`Profile` component is not very DRY. You React Router's `useRouteMatch` hook
can help with this. The `useRouteMatch` hook returns a `match` object with a
key of `url`. If you're at the `/users/8` path, then `match.url` will be
`/users/8`. Let's use `match.url` to make our code DRYer.

Replace `/users/${userId}` in the `<Link>`'s `to` props with `${match.url}`.
Replace `/users/:userId` in the `<Route>`'s `path` props with `${match.url}`.

```js
// ./src/components/Profile.js
import React from "react";
import { Route, Link, useParams, useRouteMatch } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  const match = useRouteMatch();

  return (
    <>
      <h1>Hello from User Profile {userId}!</h1>
      {/* Replaced `/users/${userId}` URL with `${match.url}` */}
      <Link to={`${match.url}/photos`}>Photos</Link>
      <Link to={`${match.url}/about-me`}>About Me</Link>

      {/* Replaced `/users/:userId` path with `${match.url}` */}
      <Route path={`${match.url}/photos`}>
        <h2>Photos for {userId}</h2>
      </Route>
      <Route path={`${match.url}/about-me`}>
        <h2>About Me for {userId}</h2>
      </Route>
    </>
  );
}
```

You can also destructure `url` from the `useRouteMatch` hook like so:

```js
const { url } = useRouteMatch();
```

If you do this, the `Profile` component will look even better:

```js
// ./src/components/Profile.js
import React from "react";
import { Route, Link, useParams, useRouteMatch } from 'react-router-dom';

const Profile = () => {
  const { userId } = useParams();
  const { url } = useRouteMatch();

  return (
    <>
      <h1>Hello from User Profile {userId}!</h1>
      {/* Replaced `/users/${userId}` URL with `${url}` */}
      <Link to={`${url}/photos`}>Photos</Link>
      <Link to={`${url}/about-me`}>About Me</Link>

      {/* Replaced `/users/:userId` path with `${url}` */}
      <Route path={`${url}/photos`}>
        <h2>Photos for {userId}</h2>
      </Route>
      <Route path={`${url}/about-me`}>
        <h2>About Me for {userId}</h2>
      </Route>
    </>
  );
}
```

In the future, you may choose to implement nested routes to keep your
application's routes organized within related components.

Here are other useful keys on the `match` object returned from `useRouteMatch`:

* `isExact` is `true` if the path matches the matched `Route` path that the
  component is rendered in
* `path` is the unmatched path (`/users/:userId` instead of `/users/8`)
* `params` is the `params` object returned from `useParams`

## `useLocation` hook

`useLocation` is the last React Router hook available in the library that you
haven't looked at yet. Take a look at the [docs on useLocation] to see how
this hook can be used.

## What you learned

In this article, you learned what nested React routes are, and how to create and
navigate nested routes with React Router. You also learned how to use the React
Router `useRouteMatch` hook to generate nested links and routes in a DRY way.

To learn more about the React Router `useRouteMatch`, see the [docs on
useRouteMatch].

[nested routes]:
  https://reacttraining.com/react-router/core/guides/philosophy/nested-routes

[docs on useRouteMatch]: https://reactrouter.com/web/api/Hooks/useroutematch
[docs on useLocation]: https://reactrouter.com/web/api/Hooks/uselocation
