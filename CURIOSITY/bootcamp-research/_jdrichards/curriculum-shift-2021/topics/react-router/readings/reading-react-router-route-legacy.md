<!-- Not sure if this reading will be used so this is unfinished -->
# React Router Legacy Route component

Before React hooks were released in React version 16, React Router's `<Route>`
component was used a little differently. You may still see this being used in
some projects.

When you finish this article, you should be able to:

* Use `<Route>`'s `component` prop to render a component
* Use `<Route>`'s `render` prop to render a component to pass in props from the
  parent component
* Know what props are available to a component rendered by a `<Route>` component
  and when to use them

## component

Begin with the `component` prop. This prop takes a reference to the component to
be rendered. Let's render your `App` component:

```js
const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Route component={App} />
      </div>
    </BrowserRouter>
  );
};
```

Now you'll need to connect a path to the component!

## render

This is an optional prop that takes in a function to be called. The function
will be called when the path matches. The function's return value is rendered.
You could also define a functional component inside the `component` prop, but
this results in extra, unnecessary work for React. The `render` prop is
preferred for inline rendering of simple functional components.

The difference between using `component` and `render` is that `component`
returns new JSX to be re-mounted every time the route renders, while `render`
simply returns to JSX what will be mounted once and re-rendered. For any given
route, you should only use either the `component` prop, or the `render` prop. If
both are supplied, only the `component` prop will be used.

```jsx
// This inline rendering will work, but is unnecessarily slow.
<Route path="/hello" component={() => <h1>Hello!</h1>} />

// This is the preferred way for inline rendering.
<Route path="/hello" render={() => <h1>Hello!</h1>} />
```

It can be helpful to use `render` instead of `component` in your `<Route>` when
you need to pass props into the rendered component. For example, imagine that
you needed to pass the `users` object as a prop to your `Users` component. Then
you could pass in props from `Root` to `Users` by returning the `Users`
component like so:

```js
// `users` to be passed as a prop:
const users = {
  1: { name: 'Andrew' },
  2: { name: 'Raymond' }
};
```

```jsx
<Route path="/users" render={() => <Users users={users} />} />
```

As a reminder, `BrowserRouter` can only have a single child component. That's
why you have wrapped all your routes within parent a `<div>` element.

```jsx
const Root = () => {
  const users = {
    1: { name: 'Andrew' },
    2: { name: 'Raymond' }
  };

  return (
    <BrowserRouter>
      <div>
        <h1>Hi, I'm Root!</h1>
        <Route exact path="/" component={App} />
        <Route path="/hello" render={() => <h1>Hello!</h1>} />
        <Route path="/users" render={() => <Users users={users} />} />
      </div>
    </BrowserRouter>
  );
};
```

With this `Root` component, you will always render the `<h1>Hi, I'm Root!</h1>`,
regardless of the path. Because of the first `<Route>`, you will only render the
`App` component if the path exactly matches `/`. Because of the second
`<Route>`, you will only render the `Users` component if the path matches
`/users`.

You would access the the `match` prop's parameters
(`props.match.params`). If you are using the `render` prop of the `Route`
component, make sure to spread the props back into the component if you want it
to know about the "match" parameters.

## `<Route>` props

Now that you've seen your React Router's `match` prop in action, let's go over
more about [route props]! React Router passes information to the components as
route props, accessible to all components with access to the React Router. The
three props it makes available are `location`, `match` and `history`. You've
learned about `props.match.params`, but now let's review the other properties of
the `match` prop!

This is an object that contains important information about how the current URL
matches the route path. Here are some of the more useful keys on the `match`
object:

* `isExact`: a boolean that tells you whether or not the URL exactly matches the
  path
* `url`: the current URL
* `path`: the route path it matched against (without wildcards filled in)
* `params`: the matches for the individual wildcard segments, nested under their
  names

When you use React Router, the browser `location` and `history` are a part of
the state of your app. You can store information about which component should be
displayed, which user profile you are currently viewing, or any other piece of
state, in the browser location. You can then access that information from
anywhere your Router props are passed to in your app.

Now that you've learned about parameters and route props, let's revisit your
`Root` component to add an `exact` flag to your `/users` route so that it does
not render with your `/users/:userId` route. Your component should look
something like this:

```js
const Root = () => {
  const users = {
    1: { name: 'Andrew' },
    2: { name: 'Raymond' }
  };

  return (
    <BrowserRouter>
      <h1>Hi, I'm Root!</h1>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/hello" render={() => <h1>Hello!</h1>} />

        {/* Render the `Users` page if no ID is included. */}
        <Route exact path="/users" render={() => <Users users={users} />} />

        {/* Otherwise, render the profile page for that userId. */}
        <Route path="/users/:userId" component={(props) => <Profile users={users} {...props} />} />
      </div>
    </BrowserRouter>
  );
};
```

## What you've learned

In this article, you learned how to use the `component` and `render` prop for
React Router's `<Route>` component to render another component at the specified
`<Route`'s `path`. You also learned what props the `<Route>` component is
passing into the component it is rendering and how to use them effectively.
