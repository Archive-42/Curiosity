# Walk-Through: Navigation Component

You will now work on creating the PetTrack page.

* `PetDetailPage`: Created in this step
* `Navigation`: Created in this step
* `PetDetails`
* `PetDetailList`
* `PetInformationItem`
* `OwnersList`
* `OwnerLink`

![Petrack component analysis]

## The strategy

This guide will work top-down, in that it will start with the top-most (or
outer-most) component, the `PetDetailPage` component. Then, it will move to
a next level component, like `Navigation`. It will just keep adding components
and getting them to work with the data from the AJAX call.

## The pet detail page component

In your **app.js** file, create a function-based component named
`PetDetailPage` like you had for `HelloWorld`. The element that it should use is
a `div` element. It will have no properties, right now. It will also have no
children, right now.

Now, do those three lines, again, to render it into DOM:

1. Select the `main` element using `document.querySelector`.
2. Create the component using `React.createElement(PetDetailPage, null)`
3. Render it using `ReactDOM.render`

If everything works, you should see no errors in your console. You should see
the "PetDetailPage" show up in the _Components_ tab. There will be no content.

![PetDetailPage with no errors]

## The navigation component

**Warning**: This is where it gets stupid. You will likely never program React
this way. However, using all of these low-level things will let you _really_
understand what's happening in React when you use the "better" stuff.

The navigation component, when complete, will instruct React to render this DOM.

```html
<header>
  <h1>Petrack</h1>
  <nav>
    <ul>
      <li>
        <a href="/pets">Pets</a>
      </li>
      <li>
        <a href="/owners">Owners</a>
      </li>
    </ul>
  </nav>
</header>
```

### Stubbing it out

Create a new file named **Navigation.js**. Copy and paste the two `import`
statements from **app.js** into the file. Now, create a function-based component
named `Navigation` in it that will render a `header` element, and export it as
the default. It should look something like this.

```js
import 'https://unpkg.com/react@16/umd/react.development.js';
import 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';

const Navigation = () => React.createElement(
  'header',
  null,
);

export default Navigation;
```

Back in **app.js**, do a _relative_ import of the **Navigation.js** file,
importing the default value into the variable name `Navigation`. Then, use that
to create an element as a child of the `PetDetailPage` component.

```js
import Navigation from './Navigation.js';

const PetDetailPage = () => React.createElement(
  'div',
  null,
  React.createElement(Navigation, null),
);
```

Remember that all arguments after the second will be rendered as _children_ of
the element. The `PetDetailPage` component now instructs React to

* Use a `div` element in the DOM
* Don't put any properties on it
* Make whatever is in the `Navigation` component a child of the `PetDetailPage`
  `div`

Refresh your page. In the _Elements_ tab, you should see that the `main` has a child
`div` (which is the `PetDetailPage` component). The `div` should have a child
`header` element (which is the `Navigation` component).

![PetDetailPage div with Navigation header]

In the _Components_ tab, you should see that the `PetDetailPage` component has
a child `Navigation` component.

![PetDetailPage with Navigation]

### Adding the header

Back in **Navigation.js**, add a third argument to the `createElement` call.
That argument should be another call to `React.createElement` that will generate
an `h1` element with the content "Petrack". (Refer to the "Hello, programmers!"
example from the beginning of the lesson.) When you refresh the browser, you
should see the big bold **Petrack** appear. Once you have that working, the
DOM that appears in your browser should look like this.

```html
<main>
  <div>
    <header>
      <h1>Petrack</h1>
    </header>
  </div>
</main>
```

### Adding the nav element

As the fourth argument to the top-level `createElement` invocation in the
`Navigation` component, call `React.createElement`, again, this time creating
a `nav` element.

Refresh the page and make sure the _Elements_ tab now shows the `nav` element as
a _sibling_ to the `h1` element.

```html
<main>
  <div>
    <header>
      <h1>Petrack</h1>
      <nav></nav>
    </header>
  </div>
</main>
```

### Quick code check-in

Here's what the code in **Navigation.js** in the solution looks like, right now.
(The comments have been added for your benefit to see how the eventual DOM will
look.)

```js
import 'https://unpkg.com/react@16/umd/react.development.js';
import 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';

const Navigation = () => React.createElement(
  'header',                                   // <header>
  null,
  React.createElement('h1', null, 'Petrack'), //   <h1>Petrack</h1>
  React.createElement('nav', null),           //   <nav></nav>
);                                            // </header>

export default Navigation;
```

Take a moment and reflect on what that is doing. Each call to
`React.createElement` will end up creating a virtual DOM element that React will
then convert into _real_ DOM when you call the `ReactDOM.render` function. The
following diagram illustrates what is happening with the code above and what
React will do with it when you tell it to render it.

![Navigation component virtual DOM]

### Unordered list and links

Now, add a child React element to the `nav` that is a `ul` with two `li`
children. The first `li` should have a single child which is a React element
that is an `a` with an "href" to "/pets" and the content "Pets". The second `li`
should have a single child which is a React element that is an `a` with an
"href" to "/owners" and the content "Owners". This is similar to what you saw in
the introduction of this exercise. Here's the first step for you to get you
started.

```js
const Navigation = () => React.createElement(
  'header',
  null,
  React.createElement('h1', null, 'Petrack'),
  React.createElement(
    'nav',
    null,
    React.createElement(
      'ul',
      null,
      // li with a here,
      // li with a here,
    )
  ),
);
```

Refresh your page every step of the way, frequently, to make sure you haven't
added a JavaScript error as you add each new element. Here's what the rendered
DOM should look like when you've finished.

![PetDetailPage navigation complete]

## What just happened?

That's a lot of code for something that you could have just easily expressed
using HTML, right? Is there any benefit to what you just did? Yes! You are
becoming intimately familiar with how React uses your definition to create the
virtual DOM from the calls to `React.createElement`. You can see how
`React.createElement` can be nested to create nested DOM elements. That's
vitally important so that you can understand how JSX works.


[Petrack component analysis]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/pettrack-pet-detail-all-components-with-details-list.png
[PetDetailPage with no errors]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/react-empty-pet-detail-page-creat-element.png
[PetDetailPage div with Navigation header]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/react-pet-detail-page-div-with-child-navigation-header.png
[PetDetailPage with Navigation]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/react-pet-detail-page-with-child-navigation.png
[PetDetailPage navigation complete]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/react-pet-detail-page-nav-complete.png
[Navigation component virtual DOM]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/react-navigation-component-virtual-dom.svg
