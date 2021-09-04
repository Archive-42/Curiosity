# Passing `props` into components

You just learned how to create a React function component and how to nest a
function component in another. A parent component can pass down information to
its children through React `props`. `props` is an object and an argument to a
React function component that is passed down from a parent to a child component.

In this article, you will learn how to:

* Pass down `props` from the parent component into a child component
* Destructure the `props` in the child component

## Passing down information through `props`

When you separate a single component into multiple components, how do you
ensure that data or information in that single component will be accessible in
the smaller components? React elements can accept `props` from its parent or
from wherever it is created or rendered. **`props` is an object that gets
passed down from the parent function component into the child function
component.** It is always the first argument to a React function component.

Remember how you define HTML attributes on a non-component JSX element? The keys
of the `props` object passed into a function component is defined in the same
way as an HTML attribute.

For example, to pass down data or `props` that looks like this,
`{ hello: "world" }`, into `NavLinks` from `NavBar`, you would define a key of
`hello` and a value of `"world"` on the `NavLinks` JSX element:

```js
function NavBar() {
  return (
    <nav>
      <h1>Pet App</h1>
      <NavLinks hello="world" />
    </nav>
  );
}
```

You can also interpolate values into JSX. Set a variable to the string, "world",
and replace the string of "world" in the `NavLinks` JSX element with the
variable wrapped in curly braces:

```js
function NavBar() {
  const world = "world"
  return (
    <nav>
      <h1>Pet App</h1>
      <NavLinks hello={world} />
    </nav>
  );
}
```

Now, `NavLinks` will know that the `props` key of `hello` has a value of
`world`. So how do you see the `props` in the `NavLinks` component? React will
invoke the `NavLinks` function with the `props` object as the first argument.
This is true for any function component. This means that you can expect the
first parameter of a function component to be an object that has its keys and
values determined by the parent component.

For example, to read and use the `props` object in `NavLinks`, you can do the
following:

```js
function NavLinks(props) {
  return (
    <ul>
      <li>
        <a href="/hello">{props.hello}</a>
      </li>
      <li className="selected">
        <a href="/pets">Pets</a>
      </li>
      <li>
        <a href="/owners">Owners</a>
      </li>
    </ul>
  );
}
```

`NavLinks` will interpolate the value of `props.hello` as the text of a rendered
link.

You can **pass down as many `props` keys as you want**. For example, to pass
down another key of `color` with the value of "green" to the `NavLinks`
component from `NavBar`, you can do this:

```js
function NavBar() {
  const world = "world";
  return (
    <nav>
      <h1>Pet App</h1>
      <NavLinks hello={world} color="green"/>
    </nav>
  );
}
```

In `NavLinks`, you can expect that the `props` object will have a key of `color`
with the value of "green".

## Destructure `props`

You can also explicitly define which `props` the child component should be
expecting by **destructuring the `props` object** in the function component's
parameter.

For example, to extract only the `hello` and `color` keys from the `props`
object passed down to `NavLinks`, you can define the `NavLinks` function
component in the following way:

```js
function NavLinks({ hello, color }) {
  return (
    <ul>
      <li>
        <a href="/hello">{hello}</a>
      </li>
      <li className="selected">
        <a href="/pets">Pets</a>
      </li>
      <li>
        <a href="/owners">Owners</a>
      </li>
    </ul>
  );
}
```

Destructuring `props` can help you make your code more readable so practice
using this whenever you can!

## Read-only

**Props should never be changed within the child component!** A component should
never modify its own `props` object.

Here's an **incorrect manipulation of `props`**:

```js
function ExampleComponent(props) {
  props.hello = "world?";
  return (
    <div>{props.hello}</div>
  );
}
```

## What you've learned

In this article you learned how to pass down information in the form of `props`
from a parent component to a child component. You also learned how to
destructure the `props` object in the child component to make your code more
readable. Finally, you learned that a component should never modify its own
`props`.
