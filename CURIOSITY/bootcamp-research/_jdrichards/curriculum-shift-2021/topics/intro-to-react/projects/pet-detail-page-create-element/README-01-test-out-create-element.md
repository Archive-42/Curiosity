# Walk-Through: Creating Elements In React

You will use the analysis presented in _Thinking In Components_ in this
walk-through. Here's the image of the final breakdown. It shows components
that will be named

* `PetDetailPage`
* `Navigation`
* `PetDetails`
* `PetDetailList`
* `PetInformationItem`
* `OwnersList`
* `OwnerLink`

![Petrack component analysis]

At the end of this walk-through, you will have reproduced this page using
`React.createElement`, `React.render`, and an AJAX call.

In true App Academy fashion, you will start with the hardest way of doing
things. One of the compelling features of this type of solution, however, is
that you do not need _any_ extra tools or special stuff to get it to run in the
browser. In the next walk-through, you will have to _install_ stuff just to get
React to properly work. This is a pure JavaScript version of React. Everything
works right out of the box.

Because of that, here's a [link to the solution] in a ZIP file. Go ahead and
download it. If you get stuck, take a peek at it. But, only because you have
spent time trying to figure out a solution without any success.

## Getting started

Install the [React DevTools for Google Chrome].

![React DevTools for Google Chrome screenshot]

Create a new directory to contain this new project. In that directory, create
three files: an **index.html** file, a **site.css** file, and an **app.js**
file. In the CSS file, add this content.

```css
body {
  padding: 50px;
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
}

a {
  color: #00B7FF;
}

label {
  display: block;
  margin-bottom: .5em;
}

input {
  display: block;
  margin-bottom: 1em;
}
```

In the **index.html** file, create a standard HTML 5 document. Then, add the
following elements:

* In the `head`
  * A `link` for a stylesheet at
    https://unpkg.com/purecss@1.0.1/build/pure-min.css
  * A `link` for the **site.css** stylesheet
* In the `body`, in this order
  * A `main` element
  * A `script` element for your **app.js** file with `type="module"` so you can
    use ES6 modules.

Initialize the project directory as a Git repository.

**Pro-Tip**: After every step that you get something to work, take a moment to
add and commit those changes to your repository. That way, if you make some
changes on some step that really messes things up, you can go back to the last
best commit using `git restore .` or `git checkout -- .` This is a _great_ way
to not have to worry about messing something up so much that you can't _Undo_
your way out of it. Git is the best undoer ever!

Serve it using a local Python server. That command, again, is `python3 -m
http.server`. Then, you should be able to open http://localhost:8000 to see the
page, empty as it is.

## Test that things are working

Get ready! You're going to do the first React thing! You're going to create a
React element that will display "Hello, programmers!". You will then have React
render it to the DOM. Copy and paste the following code into your **app.js**,
refresh your page, look at the code to get a feel for what it does, try to come
up with explanations on your own, and then continue reading.

```js
import 'https://unpkg.com/react@16/umd/react.development.js';
import 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';

const HelloWorld = () => React.createElement(
  'h1',
  null,
  'Hello, programmers',
);

const target = document.querySelector('main');
const app = React.createElement(HelloWorld, null);
ReactDOM.render(app, target);
```

**Note**: You may want to turn on "Disable cache" on the _Network_ tab of your
DevTools and keep the DevTools open while you're doing this to make sure you
always have the newest version of the files.

## Walking through the code

Even though there is really only five statements in that code block, there's a
lot going on. This section carefully walks through each of the statements to
help you get a deeper understanding.

### Those wacky import statements

Consider those `import` statements. These differ in two ways from what you've
seen with ES modules to date.

1. They come from another Web site altogether. When you use `import` to bring in
   modules from another domain, that request is governed by CORS; that means the
   other server _must_ have CORS configured to let you import their code.
   Luckily, unpkg.com configures CORS to allow any authority to import their
   script files.
2. They don't seem to import anything. There is no `import { React } from` there.
   It's just `import 'url'`. This is called a _side effect_ import and is
   generally frowned upon in modern Web development. But, React does not package
   their code in ES6 format. What those `import` statements do is _add variables
   in the global scope_. The two variables they add are `React` from the first
   import, and `ReactDOM` from the second import. Those global variables can
   then be used by your code, which happens with `React.createElement` and
   `ReactDOM.render`.

You will include them in every file that has React components. Don't worry,
though. The browser will only download them once.

If you were going to move these into production, you would change the URLs that
you import from

```js
import 'https://unpkg.com/react@16/umd/react.development.js';
import 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';
```

to

```js
import 'https://unpkg.com/react@16/umd/react.production.min.js';
import 'https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js';
```

Those files contain the "production" version of the code which is just a smaller
version of the "development" versions.

### The odd-looking function

Now, please turn your attention to this statement.

```js
const HelloWorld = () => React.createElement(
  'h1',
  null,
  'Hello, programmers!'
);
```

That statement declares the `HelloWorld` variable and stores a function in it.
This is the way that components look in React. It is a function-based component
because it's a function. It returns the value returned from
`React.createElement`. If that syntax is weird, it is functionally the same as
this code.

```js
const HelloWorld = () => {
  return React.createElement('h1', null, 'Hello, programmers!');
}
```

Because there are a lot of die-hard functional programmers (as opposed to
object-oriented programmers) that like that kind of syntax (arrow functions
without curly braces that span multiple lines), you will see it in a lot of
places while learning React.

The arguments passed to `React.createElement` are:

1. What to create in the DOM.
  * If it is a string, it needs to be all lowercase and the name of the HTML
    element to create. This example passes in `'h1'` as the tag to create in
    the DOM.
  * Otherwise, it should be the variable that holds another component. You can
    see it being used that way in the later code.
2. Any properties/attributes to put on the generated element. This example
   passes in `null` because there are no attributes needed. You will see some,
   soon.
3. The child content of the element. The third (and fourth and fifth and...)
   arguments contains what React should put as the children of the content of
   the element. In this case, the content is `'Hello, programmers!'`.

**Important**: Every time this walk-through asks you to create a function-based
component, this is what it will mostly look like. It will look like this _or_ it
will look like this and have a single parameter named `props` like this.

```js
// Without the need for data
const HelloWorldNoData = () => React.createElement(
  'h1',
  null,
  'Hello, programmers!'
);

// With the need for data has the
// props parameter.
const HelloWorldWithData = props => React.createElement(
  'h1',
  null,
  'Hello, programmers!'
);
```

### Putting it in the page

The last three statements in the code block are these.

```js
const target = document.querySelector('main');
const app = React.createElement(HelloWorld, null);
ReactDOM.render(app, target);
```

The first line is something you should be really familiar with, so no
explanation there.

The second line is using `React.createElement` to create an element from the
`HelloWorld` function-based component discussed in the last section. It has
`null` properties.

The third line _renders_ the component into the actual Web page, the component
specified by the first argument, which is the one created from the `HelloWorld`
component. If everything works, you can open your DevTools, find the
_Components_ tab, and click it to see the React DevTools show you the
"HelloWorld" component rendered by React.

![Hello programmers with dev tools]

Before moving on, add some more to that, so you get a feel for how it works.
Replace the content of your **app.js** with this stuff.

```js
import 'https://unpkg.com/react@16/umd/react.development.js';
import 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';

// The comments to each of the right of the
// lines shows what React will do with the
// stuff only after you call ReactDOM.render
// with it.
const Links = () => React.createElement(
  'ul',                                  // <ul
  { id: 'nav-links' },                   //  id="nav-links">
  React.createElement(
    'li',                                // <li
    { className: 'is-selected' },        //  class="is-selected">
    React.createElement(
      'a',                               // <a
      { href: 'https://appacademy.io' }, //  href="...">
      'App Academy'                      //    App Academy
    ),                                   // </a>
  ),                                     // </li>
  React.createElement(
    'li',                                // <li>
    null,
    React.createElement(
      'a',                               // <a
      { href: 'https://aaonline.io' },   //  href="...">
      'a/A Open',                        //  a/A Open
    ),                                   // </a>
  ),                                     // </li>
);                                       // </ul>

const HelloWorld = () => React.createElement(
  'h1',
  null,
  'Hello, programmers',
);

// Creates the HelloWorld first and, then, creates
// the Links
const AllTogether = () => React.createElement(
  'div',
  null,
  React.createElement(HelloWorld, null),
  React.createElement(Links, null),
);

const target = document.querySelector('main');
const app = React.createElement(AllTogether, null);
ReactDOM.render(app, target);
```

Look at what gets produced in the _Elements_ tab of your DevTools. Look at what
gets produced in the _Components_ tab of your DevTools for all three of your
components. Play around with it: change tags, replace some of those `null`
second arguments with objects to see what gets presented. Give it a whirl.
You're going to be doing what you see, here, throughout this walk-through, so
this is as good a time as any to explore.

Now, to the fun work. If you'd like, you can comment out all of that code
(except the `import` statements) and keep it around as a reference. Or, you can
move it (except the `import` statements) to another file to keep it around as a
reference. Or, you can just delete it all (except the `import` statements)
because you have a photographic memory.

Time to get the pet details page working.


[Petrack component analysis]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/pettrack-pet-detail-all-components-with-details-list.png
[React DevTools for Google Chrome]: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
[Hello programmers with dev tools]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/react-hello-programmers-create-element-with-react-tools.png
[React DevTools for Google Chrome screenshot]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/react-devtools.png
[link to the solution]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/projects/solutions/pet-detail-page-create-element-solution-20200402.zip
