# From JavaScript To DOM

The path from JavaScript to actual DOM elements appearing in your HTML document
is not complex thanks to React. However, it is worth reviewing so that there is
no mystery about it.

In this article, you will review how to use JSX to create React's virtual DOM
that React will convert into real DOM. There are three steps:

* Using JSX to build the "element tree"
* Build the virtual DOM by invoking `render`
* "Waiting" for React to convert its virtual DOM into real DOM

## Using JavaScript eXtension

Developers invented a new language that sits on top of JavaScript called
_JavaScript eXtension_, or JSX. JavaScript eXtension (JSX) uses familiar
HTML syntax in JavaScript files that can be transpiled by tools like [Babel]
into JavaScript code.

## Creating elements

To create a React virtual DOM node using JSX, define HTML syntax in a
JavaScript file.

```js
const hello = <h1>Hello World!</h1>
```

Here, the JavaScript `hello` variable is set to a React virtual DOM `h1` element
with the text "Hello World!".

You can also nest virtual DOM nodes in each other just like how you do it in
HTML with the real DOM.

```js
const navBar = (
  <nav>
    <ul>
      <li>Home</li>
      <li>Profile</li>
      <li>Settings</li>
    </ul>
  </nav>
);
```

A JavaScript `navBar` variable is set to a React virtual DOM `nav` element that
has a `ul` React element nested inside of it. The `ul` element has three `li`
child elements with text as their child.

Remember, don't be fooled! JSX **looks like HTML, but is not actually HTML**. No
real HTML DOM elements have been created yet. You still need React to convert
the virtual DOM nodes created from the JSX into real DOM elements.

### HTML attributes in JSX

Now, how do you add HTML attributes like `class`, `href`, and `src` to React
elements created using JSX?

In HTML, you can define these attributes on the element like so:

```html
<a class="nav-link" href="/home">
  <img src="home">
  Home
</a>
```

In JSX, you can define these attributes in a similar fashion:

```js
const navList = (
  <ul>
    <li className="selected">
      <a href="/pets">Pets</a>
    </li>
    <li>
      <a href="/owners">Owners</a>
    </li>
  </ul>
);
```

The HTML attribute names are mostly the same in JSX. There are a few exceptions.
In the above example, `className` is used in JSX instead of the  `class` HTML
attribute. You may see other discrepencies with HTML attribute names in JSX in
the future, but the main difference is that JSX uses camelCase instead of
sword-case. Check out the [React DOM elements docs] to see examples of other
differences.

## Converting to virtual DOM

So how do you tell React to convert virtual DOM nodes into real DOM nodes? To
start the conversion process, you have to use the `ReactDOM.render` method which
takes a React virtual DOM node and a real DOM node in the document.
`ReactDOM.render` will convert the virtual DOM node into a real DOM and nest it
under the given real DOM node.

> Remember, you can get a real DOM node by using `document.querySelector`, or
> `document.getElementById` (if the element has an `id` attribute).

If you wanted to insert what was created in the last section into the `main`
tag, the most straightforward way is like this:

```js
// Put the element tree in a variable
const navList = (
  <ul>
    <li className="selected">
      <a href="/pets">Pets</a>
    </li>
    <li>
      <a href="/owners">Owners</a>
    </li>
  </ul>
);

// Get a DOM node for React to render to
const mainElement = document.querySelector('main');

// Give React the element tree and the target
ReactDOM.render(navList, mainElement);
```

At this point, you have given your desired element tree to React. It will
take that element tree and construct the virtual DOM from it. After it builds
its own model of the virtual DOM using the elements that you created, it can
now take that and turn that into real DOM.

![Convert virtual DOM to real DOM]

It takes that real DOM and inserts it as the content of the target that you gave
it which, in this case, is the `main` element in the body of the document.

## Updates

When you call `ReactDOM.render` again for the same component and target, React
takes the existing virtual DOM it knows about last time it rendered the element
tree, compares it to whatever new thing you want to render, and determines which
(if any) of the living DOM needs to change.

For example, let's say you constructed the same element tree but left off the
"selected" class for the first list element. Then, when you rendered it, again,
by calling `ReactDOM.render`, React would compare the new element tree with the
old element tree, figure out that one class was missing on that one `li`
element, and remove that and only that from the real DOM.

![Virtual DOM diff]

## What you've learned

In this article, you learned how to convert desired HTML into properly-formatted
JSX elements. You also learned that React takes your JSX elements and builds its
virtual DOM from them and that React takes that virtual DOM and inserts it into
the living HTML document. Finally, you learned that React will compare an old
virtual DOM tree with a new virtual DOM tree, figure out what changed, and then
change that and only that in the real DOM.

[Babel]: https://babeljs.io/
[React DOM elements docs]: https://reactjs.org/docs/dom-elements.html
[Convert virtual DOM to real DOM]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/react-example-conversion-real-dom.svg
[Virtual DOM diff]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/react-example-virtual-dom-diff.svg
