
# Handling Events

Event handling is a key part of any dynamic application; without it, you
wouldn't be able to respond to user actions. As with most things in React, how
you add event listeners and handle events is different from how you'd do it in
vanilla JavaScript, it also manages to feel familiar.

In an earlier article, you saw an example of handling button click events. In
this article you'll deepen your understanding how to handle events in React
components.

When you finish this article, you should be able to:

* Add event listeners to elements
* Prevent event default behavior

## Adding event listeners

To add an event listener to an element, define a method to handle the event and
associate that method with the element event you want to listen for:

```js
function AlertButton() {
  showAlert = () => {
    window.alert('Button clicked!');
  }

  return (
    <button type='button' onClick={showAlert}>Click Me</button>
  );
}

export default AlertButton;
```

In the above example, the `showAlert` method is the event handler, which simply
calls the `window.alert` method to display the text "Button clicked!" within a
browser alert dialog. The `showAlert` event handler is added as a listener for
the `<button>` element's click event using the `onClick` attribute (i.e.
`onClick={showAlert}`).

When adding event listeners, be sure to camelCase the event name (i.e. `onClick`
instead of `onclick`) and pass a reference to the event handler method instead
of calling it (i.e. `showAlert` instead of `showAlert()`).

> See the official React documentation for a [list of the supported
> events][react events].

## Preventing default behavior

Within the browser, HTML element events often have default behavior associated
with them. For example, clicking an `<a>` element will navigate to the resource
indicated by the anchor element's `href` attribute or clicking a `<button>`
element that's contained with a form will submit the form.

When handling button clicks in the previous example, nothing special had to be
done to prevent the event's default behavior from interfering with our intended
action because a `<button>` element of type `button` doesn't have any default
behavior associated with it.

Consider the following example though:

```js
// ./src/NoDefaultSubmitForm.js

function NoDefaultSubmitForm() {
  submitForm = () => {
    window.alert('Handling form submission...');
  }

  return (
    <form onSubmit={submitForm}>
      <button>Submit</button>
    </form>
  );
}

export default NoDefaultSubmitForm;
```

In this example, a `<button>` element without a `type` attribute is rendered
within a `<form>` element. By default, this button will submit the form when
clicked. This has the unintended consequence of reloading the page when the
button is clicked, instead of allowing the `submitForm` event handler
method to handle the form submission.

> In an actual React application, the `submitForm` event handler method
> would likely use the browser's Fetch API to send a `POST` or `PUT` request to
> a REST API when the form is submitted. To keep this example as simple as
> possible, the `window.alert` method is used to display the text "Handling form
> submission...".

To keep the default form submission from occurring, the event handler method can
be updated to this:

```js
submitForm = (e) => {
  e.preventDefault();
  window.alert('Handling form submission...');
}
```

Notice that a parameter named `e` has been added to the anonymous method
definition. The `e` parameter references an event object that's the form
submission event being handled. The `e` event object provides a method named
`preventDefault` that when called, prevents the event's default action.

## What you learned

In this article, you learned how to add event listeners to JSX elements. You
also learned how to prevent event default behavior.

[react events]: https://reactjs.org/docs/events.html#supported-events
