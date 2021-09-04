# Walk-Through: Pet Details, Part 1

You will now start adding data rendering to the page with the components created
and modified in this step.

* `PetDetailPage`: Modified in this step
* `Navigation`: Done
* `PetDetails`: Created in this step
* `PetDetailList`: Created in this step
* `PetInformationItem`: Created in this step
* `OwnersList`
* `OwnerLink`

![Petrack component analysis]

## Getting some data

Open the **app.js** file. In it, after your call to `ReactDOM.render`, create a
fetch call for the RESTful endpoint
https://polar-beach-08187.herokuapp.com/api/pets/2. (You can click on the link
to see the data. That's "Mog", the cat. She is forgetful.) Do all of the normal
stuff that you would do with `async` functions and what not.

```js
(async () => {
  const url = 'https://polar-beach-08187.herokuapp.com/api/pets/2';
  const response = await fetch(url);
  if (response.ok) {
    const pet = await response.json();
    console.log(pet);
  }
})();
```

![Petrack Mog data fetch]

Now, to pass that data into your React components, you will pass it as a
property. You have to pass it on the element getting rendered. React is all
about rendering things. You can just call another render from inside your
`async` function. But, this time, you will pass the pet data in as a property
of the `PetDetailPage` component.

```js
(async () => {
  const url = 'https://polar-beach-08187.herokuapp.com/api/pets/2';
  const response = await fetch(url);
  if (response.ok) {
    const pet = await response.json();
    console.log(pet);

    const app = React.createElement(PetDetailPage, { pet });
    ReactDOM.render(app, target);
  }
})();
```

This has changed everything! You don't see it, yet, but once the AJAX call
completes, go look at the _Components_ tab of your DevTools. Click on the
`PetDetailPage` component and look at the values in the right pane. React now
knows about the data that you passed in!

![Petrack PetDetailPage with data]

You will use that data to pass down into the detail components that you will now
create.

## The pet details component

The `PetDetails` component is in charge of rendering the `PetDetailList` and the
`OwnersList` components. For now, get a new component working.

Create a new file named **PetDetails.js**. Here's some code for you that you can
use for your `PetDetails` component. You've really had enough of all of that
nesting. Feel free to copy and paste it so that you can get on to the neat-o
data stuff. Don't forget to also

```js
import 'https://unpkg.com/react@16/umd/react.development.js';
import 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';

const PetDetails = props => React.createElement(
  'div',
  null,

);

export default PetDetails;
```

In the **app.js** file, import the new `PetDetails` component. You now
need to prepare your `PetDetailPage` component to use the data. Still in
**app.js**, change the definition of the function-based component to have a
single argument (conventionally named "props") rather than an empty argument
list.

```js
// Code snippet
const PetDetailPage = props => React.createElement(
```

When React first renders that element, the value of `props` will be an empty
object. When you tell React to render after you get the data from the AJAX call,
the value of `props` will now be and object with a "pet" property that contains
the data that you passed into it. You want to pass that data to the `PetDetails`
component. Add this line as a fourth argument to the `React.createElement`
invocation.

```js
React.createElement(PetDetails, { pet: props.pet })
```

That will now pass the pet data object that the `PetDetailPage` got into your
`PetDetails` component. If everything works, when you refresh your page, you
should see the following in your _Components_ tab of the DevTools.

![Petrack PetDetails rendered with data]

With the _Components_ tab open, refresh the page. You can see that the props
property starts off with a value of `undefined`. Then, when the AJAX call
completes, it magically gets assigned the value by React. That's really cool!

Now, time to work on the detail list.

## Create the pet detail list component

Here's some code for you that you can use for your `PetDetailList` component.
Create a file named **PetDetailList.js** and put it in there. Feel free to copy
and paste it so that you can get on to the neat-o data stuff.

```js
import 'https://unpkg.com/react@16/umd/react.development.js';
import 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';

const PetDetailList = props => React.createElement(
  'div',
  null,
  React.createElement('h2', null, 'Details'),
  React.createElement(
    'dl',
    null,

  )
);

export default PetDetailList;
```

Back in **PetDetails.js**, import this component and add it as a child to the
`PetDetails` component.

```js
// Add the import line
import PetDetailList from './PetDetailList.js';

const PetDetails = props => React.createElement(
  'div',
  null,

  // Add it as a child
  React.createElement(PetDetailList, props.pet),
);
```

Refresh your page. You should now see the `PetDetailList` in the _Components_
tab. It's props should have all of data for the pet on it. You should also see
the "Details" headline in the rendered HTML, too.

The next step is to create the `PetInformationItem` component to fill out that
`dl` just yearning for content in the `PetDetailList` component.

## The pet information item component

**Note**: The following steps will introduce an error that you will fix. This is
so you can get a feel for what kind of errors you will see when working with
React.

Create a new file, **PetInformationItem.js**. It will contain a function-based
component that needs data to render, so stub out the function with the "props"
parameter. Don't forget to import the React files.

You will now use a fancy feature of React. The `PetInformationItem` component is
responsible for modeling the following DOM structure. These are entries in the
definition list that the `PetDetails` component created in that last step, that
`dl`.

```html
<dt>Name of property</dt>
<dd>Value of property</dd>
```

This is a problem. React _requires_ all components to have a **single root
element**. Look at that HTML. There is no single root element. There are _two_
top-level elements. For a very long time in the React community, developers
could not do this, create a component that needed to model two DOM nodes without
a parent. It wasn't until four and a half years after its introduction that
React could handle this with a special placeholder called a _fragment_. That's
what you will use for the root element of the `PetInformationItem` component.

```js
const PetInformationItem = props => React.createElement(
  React.Fragment,
  null,
  // children will go here
);
```

That allows you to tell React that it should not create a DOM element to hold
whatever children you will add to it. It should just insert the children into
the DOM without a parent element.

Now, for the children, you need two. You need one that is a `dt` element that
will show the _name_ of the information item. You also need one that is a `dd`
element that will show the _value_ of the information item. Here's the one for
the `dt`.

```js
const PetInformationItem = props => React.createElement(
  React.Fragment,
  null,
  React.createElement('dt', null, props.name),
  // Put the dd element here to show the value
);
```

Replace the comment with a call to `React.createElement` that will show the `dd`
with `props.value`.

That implies an expectation that this component _needs_ a property named "name"
that will be used to render the `dt` element, and it _needs_ a property named
"value" to render the `dd` element.

Once you have that done, it's time to use it in the `PetDetailList` components.
Go back to **PetDetailList.js**. Import the `PetInformationItem` component. You
will use it three times, to show the name, age, and pet type of the pet. Just
add this because you will need to investigate an error.

```js
const PetDetailList = props => React.createElement(
  'div',
  null,
  React.createElement('h2', null, 'Details'),
  React.createElement(
    'dl',
    null,
    React.createElement(PetInformationItem, { name: 'Name', value: props.name }),
    React.createElement(PetInformationItem, { name: 'Age', value: props.age }),
    React.createElement(PetInformationItem, { name: 'Type', value: props.PetType.type }),
  )
);
```

This shows that `PetDetailList` now has an expectation that `props` will have a
"name" property, an "age" property, and a "PetType" property that will have a
"type" property on it! That's a lot of expectations...

If you refresh your page, something bad should have happened.

![Petrack PetDetails with error]

In the above screen shot, it complains that it cannot get the "property 'type'
of undefined". Can you see where that's happening in the **PetDetailList.js**
file? Take a moment to figure out where the error is being thrown.

If you identified the expression `props.PetType.type`, then you got it! Remember
that when the React first renders the virtual DOM, it has _no data_. That
doesn't come until later, after the AJAX call completes. There are _so many_
ways to fix this but **only one** is idiomatic React. That is the use of
`defaultProps`.

Recall that the `PetDetailList` component has an expectation that the `props`
value should have a "PetType" property that is an object. You can specify a
default value for the "PetType" property for the `PetDetails` component by
putting the following code _after_ the function declaration.

```js
PetDetailList.defaultProps = {
  PetType: {}
};
```

This tells React that, when the `PetDetailList` renders, if the "PetType"
property of `props` is undefined, then it should use the default value specified
in the assignment. This is a built-in React feature and fixes the problem.

Refresh the page. You should now see the page render and, when the AJAX call
completes, the name "Mog" to appear.

![Petrack PetDetails before and after load]

If you want that yucky bumpy load to not happen, consider creating a default
value for the "value" property in `PetInformationItem`. In the following
screenshot, you can see what happens when you set a default value of
"loading..." for the "value" property in `PetInformationItem`.

![Petrack PetDetails with loading message]

## What you've seen

In this part of building a React application, you have

* Passed data from an AJAX call (or really wherever) into a React
  application
* Accessed data using the conventionally-named `props` parameter to your
  function-based components
* Passed data from a "parent" component to a "child" component
* Used default values to prevent errors and improve the aesthetic experience of
  using your application

Just one more step and you're done!

[Petrack component analysis]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/pettrack-pet-detail-all-components-with-details-list.png
[Petrack Mog data fetch]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/react-mog-data-pull.png
[Petrack PetDetailPage with data]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/react-pet-detail-page-with-data.png
[Petrack PetDetails rendered with data]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/react-pet-details-rendered-with-pet-data.png
[Petrack PetDetails with error]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/react-pet-details-with-error.png
[Petrack PetDetails before and after load]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/react-information-data-load.gif
[Petrack PetDetails with loading message]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/react-information-with-loading-message-data-load.gif
