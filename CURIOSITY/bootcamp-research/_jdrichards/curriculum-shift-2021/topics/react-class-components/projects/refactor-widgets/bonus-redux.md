# Bonus Phase 2: Redux with Class components

This bonus phase is meant to be very challenging, so don't be discouraged if it
doesn't click!

Connecting Redux with Class components is a little tricky. To connect Redux to
a function component, you are given hooks like `useSelector` and `useDispatch`
to subscribe to parts of the state and dispatch actions. With Class components,
you need to define what's called a **[higher order component]** surrounding the
Class component to give the Class component access to the Redux store state and
dispatching actions.

For details on how wrap the Class component for access to the Redux store state
and dispatching actions, see the Redux documentation on how to use the [connect]
function from the `react-redux` package.

Try converting the Grocery Store Application earlier this week into using Class
components with Redux.

[higher order component]: https://reactjs.org/docs/higher-order-components.html
[connect]: https://react-redux.js.org/api/connect