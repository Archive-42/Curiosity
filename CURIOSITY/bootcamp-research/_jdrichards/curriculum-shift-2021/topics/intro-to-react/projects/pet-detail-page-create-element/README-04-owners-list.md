# Walk-Through: Pet Details, Part 2

All you have left is to create a list of owners with links.

* `PetDetailPage`: Done
* `Navigation`: Done
* `PetDetails`: Modified in this step
* `PetDetailList`: Done
* `PetInformationItem`: Done
* `OwnersList`: Created in this step
* `OwnerLink`Created in this step

![Petrack component analysis]

You're almost done. Now, you get to handle a collection of data from the owners.

## Stub out the owners list component

You've done this four other times, so it's pretty straight forward.

* Create the **OwnersList.js** file. In it,
  * Import the React libraries
  * Create the function-based component named `OwnersList` with a `props`
    argument that uses a `React.Fragment` as its element
  * Add a child that is an 'h2' with the content "Owners"
  * Using `defaultProps`, add a default property value for "owners" and set it
    to an empty array because this component will expect an array of owner data
  * Export the `OwnersList` as the default export
* In the **PetDetails.js** file,
  * Import the `OwnersList` component
  * Add it as another child element of the `PetDetailPage` component after the
    `PetDetailList`
  * Pass in the owners to the `OwnersList` component in a property named
    "owners" like this `{ owners: props.pet.Owners }` which will pass in the
    array of owners for the pet
  * Fix the error with a default value for the "pet" property

Refresh the page and make sure everything still works.

![Petrack with owners headline]

## Dealing with the list

**Note**: This section introduces an error that you will fix. It is a common
error about how to create React elements from lists. You may see it often. This
way, you will know how to fix it, too.

Back in **OwnersList.js**, you want a `ul` to follow the `h2`.

```js
const OwnersList = props => React.createElement(
  React.Fragment,
  null,
  React.createElement('h2', null, 'Owners'),
  React.createElement(
    'ul',
    null,
    // List items go here
  )
);
```

Here's the thing. You have an array of owners. You want to turn them into some
list items. For each owner, you want to _map_ that to a list item. And, therein
lies the hint. Since the value in `props.owners` is an array, you can use the
`map` function to generate another array of React elements and plop them in
there! Give it a go with this code. Replace the comment about where list items
go above with this line of code.

```js
props.owners.map(owner => React.createElement('li', null, owner.firstName)),
```

Refresh the page. What happens? You should now see "Human" for each of the
list items. That's great! In the console, there's an error. That's sad!

![Petrack with owners list and key error]

In this last step, you've changed the way you're passing children into the
`React.createElement`. Up until now, you've passed a single element as a child,
like in **PetDetailList.js** where you have this code.

```js
React.createElement(
  'dl',
  null,
  React.createElement(PetInformationItem, { name: 'Name', value: props.name }),
  React.createElement(PetInformationItem, { name: 'Age', value: props.age }),
  React.createElement(PetInformationItem, { name: 'Type', value: props.PetType.type }),
)
```

Each of those arguments to the outer `React.createElement` call are single
invocations of the `React.createElement` and, therefore, single nodes in the
virtual DOM.

Your code in **OwnersList.js**, this code,

```js
const OwnersList = props => React.createElement(
  React.Fragment,
  null,
  React.createElement('h2', null, 'Owners'),
  React.createElement(
    'ul',
    null,
    props.owners.map(owner => React.createElement('li', null, owner.firstName)),
  )
);
```

in that, you have created an _array_ of objects. Recall that when you call the
`map` function on an array, it returns _another array_. React doesn't care
about this, but it would like a little help in tracking each of those entries
in the virtual DOM that it builds. That's what the error message is about,
giving React a little help by providing a "key" property for each of the
elements that you're creating in the array. The value of the "key" property
must be unique and stable, that is, for a given object (like an owner named
"Human One" with an id of 7), the value returned must always be the same.
Luckily, because you have the id of the owner, you can use that because that id
value is tied to a primary key, somewhere, and should never change for this
object. The name can change, of course. But, the id will likely never change.

Replace the `null` in the `React.createElement` call that generates the `li`
with and object literal that has the property name "key" and an associated value
of the id of the owner. When you do that, the error should go away.

## The owner link component

While it's nice, and all, to see the owner's first name in the list, the actual
page has a link to the owner page with the format "last name, first name". Time
to create the (last!) component of this walk-through.

Create a new file named **OwnerLink.js**. In it, do the following:

* Import the React files
* Create a new function-based component named `OwnerLink` that accepts data that
  has
  * `a` as its element
  * An object literal with the property name "href" and the value of the
    "href" property passed in through the `props`
  * A string as its child which contains the last name and the first name
* Export the component as the default export

Once you have that, import the `OwnerLink` component into the **OwnersList.js**
file and replace the expression

```js
React.createElement('li', { key: owner.id }, owner.firstName)
```

with one that creates `OwnerLink` elements

```js
React.createElement('li', { key: owner.id }, React.createElement(OwnerLink, owner))
```

Refresh the page. If everything works, you're done!

## What you've done, here

In this part of the walk-through, you used a collection to render a collection
of React elements. You found out that using a collection like that requires you
to provide a "key" property that has a stable, unique value. Once you had that,
React would gladly manage that collection of objects in its virtual DOM.

## What you've done, overall

You have used the `React.createElement` method to do some amazing things, here.

* You reinforced the best practice of putting one React component in its own
  file (module) and exporting it as the default value of the module
* You learned that `React.createElement` takes as arguments
  * Either a string that describes what DOM element it should produce, another
    React component of your creation, or the `React.Fragment` built-in
    component
  * An object literal that describes the properties it should have access to,
    either for data to use or for attributes on the rendered HTML
  * One or more other elements that are the children of this element, either as
    separate calls or as an array (or a combination of those, which you didn't
    see, but React would happily manage)
* You went down the rabbit hole of multiple nestings of the
  `React.createElement` call to create nested elements in both the virtual DOM
  as well as the real DOM
* You used _pure functional components_ all the way through this, which means
  that none of the components used any other data than what was given to it
* You are intimately familiar with how React creates its elements, now, which
  means there will be no magical thinking about JSX when you use it

[Petrack component analysis]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/pettrack-pet-detail-all-components-with-details-list.png
[Petrack with owners headline]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/react-pet-detail-with-owners-headline.png
[Petrack with owners list and key error]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/react-pet-detail-owners-list-with-key-error.png
