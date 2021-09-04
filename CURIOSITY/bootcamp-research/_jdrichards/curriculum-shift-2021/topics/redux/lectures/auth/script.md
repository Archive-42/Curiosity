# React Front-End Auth Lecture

Hello, and welcome to a lecture on using Redux and authentication all rolled
into one! This is going to be a little bit of a whirlwind, my friends, but
today's project will explain it all again as you work through the different
pieces.

To get started, let's review what I have running.

«Insomnia»

I have a backend running, right now, which has two endpoints. There's a login
endpoint and a data endpoint. You can see that when I submit my PUT request to
the session endpoint, I get back a JSON Web Token. I can use that token to then
get a list of movies from the API. If I disable the JWT from being added to the
header, you can see that I get a 401 Not Authorized response. That's the
backend, super simple for this demo.

Now, let's take a look at the frontend that I have generated using App Academy's
simple template.

«VS Code + Browser»

In this project, there's an App component that provides a browser router for me.
There's a navigation component that shows the nav links at the top of the page.
There a switch which swaps out the movie table and the login form. The movie
table has the table definition and header and, then, for some list of movie
objects, renders a row for each one. Because we have no movies, we have no rows.

The way that I want this application to work is, if I'm not logged in, I want it
to redirect me to the login form. Then, when I successfully log in, I want to be
able to access the movies list. That's where we're headed. And, I'm going to do
it all with Redux to manage my state.

First, I need to install the new dependencies for the application, react-redux,
which integrates Redux with React, redux itself, and then redux-thunk, the
middleware I can use to handle "side effects".

```shell
npm install redux react-redux redux-thunk
```

To organize all of my state-management code, I'm going to create a new directory
in my src directory named "store". This is a convention that many React/Redux
developers use, to put the Redux store, the thing that holds the application
state, in its own directory like this. In this directory, I'm going to create a
file named "configureStore.js" which will do just that: it will configure my
Redux store with the functions that update the store, called "reducers", and any
middleware that I want to put in there, in this case, that'll be Redux Thunk.

What I'm going to put in here is a boilerplate code, so rather than watch me
type it all, please let me paste it in here. I'll explain what each line does.

```js
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
});

const configureStore = () => {
  return createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk)),
  );
};

export default configureStore;
```

«explain the file»

Now that I have a function that configures the store, I need to put it someplace
where the React application can integrate with it. This is normally done in the
index.js file.

```js
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

// ...

    <Provider store={store}>
      <App />
    </Provider>
```

All I've done, here, is follow the directions from the react-redux site about
how to put weave my store into the application. I import the Provider component
which provides the store to the rest of the components in the React app. I
import and run the configureStore function to create a new store. Then, I wrap
the App component with the Provider component and provide the store property
the store created from my configureStore method.

You can see in the Redux tools that Redux is now hooked up and showing that one
action has taken place, the @@INIT action which just initializes Redux. You can
also see on the state button, here, that the state is just an empty object. I'm
going to change that.

I'm going to put some dummy data into the store so that we can see it show up.
I'm going to create a file in the store directory named movies.js. In there,
I'll put all of the code that has to do with showing movies.

The main thing to know about Redux is the idea of a reducer. A reducer in Redux
is a function that takes two arguments: the current state that the reducer
handles and an action. A reducer can only use those two arguments in it; there
can't be any AJAX calls, there can't be any random number generation, there
can't be any calls to setTimeout, you can only use the values passed into the
reducer. I'm going to create the reducer for movies, now.

```js
const initialState = [
  { id: 0, title: 'Fake Movie', year: 2024, audienceScore: 4.6 }
];

function reducer(state = initialState, action) {
  return state;
}

export default reducer;
```

You can see that I created an initial state for the reducer, an array that
contains one fake movie record. This looks kind of like the data that will come
from the API. Then, I created the reducer function itself. When Redux first
loads, it will call the reducer with an undefined state. This allows the
programmer to provide a default argument for the default state. In this reducer,
it does nothing to change the data, so it just returns the state unchanged.
Finally, I export it.

To get the reducer integrated into the application, I go back to the
configureStore file, import it, and add it to the combineReducers function.

```js
import movies from './movies';

// ...

const reducer = combineReducers({
  movies
});
```

Now, you can see that the state contains a single movie, the one that I passed
into the reducer for the movies. You can see, also, that the array is on a
property named "movies". That's because combineReducers will store the output of
the reducer on a property of the same name that it is combined with. If I change
this to "banana", then the property will be named "banana".

```js
const reducer = combineReducers({
  banana: movies
});
```

See, it's now banana in the state. I will just undo that change...

Now that there is data in the state, I want to show it in the movie table. To
do that, I need to connect my movie table component to the redux store. I do
this in the MoviesTable file. First I import it.

```js
import { connect } from 'react-redux';
```

Now, connect is a weird function. It is a function that returns another
function. I'm going to type this out for you, and then show you how you'll see
it in real-world code.

```js
const connectComponent = connect();
const connected = connectComponent(MoviesTable);
export default connected;
```

The connect function returns another function which I call connectComponent.
That function then takes the actual component that I want to connect, in this
case the MoviesTable component. That returns a new React component that is
hooked up to the Redux store. That new dynamic component is what gets exported
from the file.

Back to the connect function. It can take zero, one, or two parameters. In this
case, it's taking zero. I'm going to use the first parameter which should be a
function that takes the current state and creates a new object that will get
merged into the props that is the components argument up here. By convention,
this function that maps the state to props is called mapStateToProps.

```js
const mapStateToProps = state => {
  return {
    movies: state.movies,
  };
};
```

You can see this is a really simple function. React-Redux will give it the
current state from the Redux store. In there, I've taken the value stored in
the movies property of the state and copied that to a movies property of a new
object that gets returned. Now, I just take that function and pass it as the
first parameter to the connect function...

Magic! Now, React-Redux is calling my mapStateToProps function to get what state
I want to pass into the component. Then, it takes that object that I returned
and merges it into the props for the MovieTable's parameter. That's just lovely.

Ok, so I have these functions all laid out here at the end of the file. This is
not the way React/Redux programmers write this. You won't see it like this in
the documentation. Instead, they do all of the function calls, here, on one
line.

«Walk them through refactoring to connect(...)(component)»

That's what you'll see, or some variation of this.

Now, I'm going to add another part of the state, which is the auth token. This
has nothing to do with movies, so I'm going to create a new file in the store
directory named auth.js.

In that file, I'm going to do what I did before: create an initial state, create
a reducer that returns the initial state, and export it.

```js
const initialState = {
  token: ""
};

function reducer(state = initialState, action) {
  return state;
}

export default reducer;
```

Now, to include it into the application, I need to import it and use it in my
configureStore file.

```js
import auth from './auth';

// ...

const reducer = combineReducers({
  movies,
  auth,
});
```

If I show you the Redux store, now, you can see that the empty string for the
token is now part of the state. Now that it's part of the state. That token
represents my logged in state. If the token is empty, like now, then I am not
logged in. If the token is not empty, then I must have logged in and gotten that
token from the server.

I'd like to make a decision based on the value of token about which component I
will render. I'm going to build a component called ProtectedRoute that looks
like Route, but takes in one extra property names isLoggedIn.

First, I'll create a file named ProtectedRouter.js.

Then, I'll go ahead and declare my component.

```js
import React from 'react';

// <Route path="/" exact={true} component={MoviesTable} />
const ProtectedRoute = props => {

};

export default ProtectedRoute;
```

I'm going to replace the Route with a ProtectedRoute. I want to pass in
isLoggedIn to the properties, so I'll capture that.

```js
const { isLoggedIn } = props;
```

If that value is `false`, then I want to redirect to the login URL. React Router
has the `Redirect` component, so I'm going to use that.

```js
if (!isLoggedIn) {
  return <Redirect to="/login" />
}
```

If it's not logged in, then this function will return a component that directs
the browser router to redirect to the "/login" path. If the person is logged in,
then it should return the route. That's what I've done, here.

Now, what happens when they are logged in?

```js
import { Redirect, Route } from 'react-router-dom';

// ...

return <Route {...props} />
```

I'm just declaring the route and then spreading the properties values into it.
I should be able to use this in my code, now.

In my App component, I will import the new ProtectedRoute and replace the one
for the movies route with it.

```js
import ProtectedRoute from './ProtectedRoute';

// ...

<ProtectedRoute isLoggedIn={} path="/" exact={true} component={MoviesTable} />
```

And, at this point, I need a value from the state to tell the ProtectedRoute
that the person is logged in or not. I need to connect my App component to the
Redux store and get the token out of it. I will create my mapStateToProps
function to do that.

```js
const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};
```

Now, I will connect the App component to the store using that mapStateToProps
function.

```js
import { connect } from 'react-redux';

// ...

export default connect(mapStateToProps)(App);
```

Now that the token will exit on the props of my App component, I will use that
with the isLoggedIn property of the ProtectedRoute. I first need to add the
props argument to the App component, then add the props.token value to
isLoggedIn.

```js
function App(props) {

// ..

<ProtectedRoute isLoggedIn={props.token} path="/" exact={true} component={MoviesTable} />
```

When the person is not logged in, then props.token is the empty string which is
a falsey value. You can see that when my browser refreshed, I'm now on the login
page. When I try to click the Movies link in the nav, you can see that I can't
get to it because that ProtectedRoute prevents me from seeing it.

I'm going to test this out by putting a non-empty string into the default value
of token to make sure my logic works. In auth.js, I'll just put some text in the
string.

```js
const initialState = "logged in";
```

Now, I can freely move between login and movies. I will change that back, now.

```js
const initialState = "";
```

It's now time to get the login working. Here's where you'll see lots of Redux
all at once.

When somebody types into the email and password fields, the application needs
to know their values. I have two choices about how to store that state, either
in the component or in the Redux store. Either of these is an acceptable
solution. I am going to choose the Redux store because this is a Redux video.

The way to handle form fields is straight-forward. I must subscribe to their
onChange event and send the value of the form field to the store using an
action. The action is then handled by the reducer to update the state. Then, I
will set the value of the form field to the value in the store. I know that
sounds like a lot, but bear with me. We'll take it nice and slow.

I will start with the email field. When the value of the field changes because
someone typed in it, I need an action to encapsulate that data. An action is
like a command to the store that says, hey, here's some data that happened
because of something, now update the state in the store with it.

Because this has to do with authentication, my first action will be in the
auth.js file. Actions have must have a property on them named type. They can
have associated data with it, too, but they must have a property named type.

The accepted way to do this is to create a constant that contains the type's
name like this.

```js
const UPDATE_EMAIL_VALUE = 'lecture/auth/UPDATE_EMAIL_VALUE';
```

The value in the string can be anything you want, as long as its unique for all
actions in your application. Some developers, like myself, have conventions for
what goes into the string. My convention is project name ("lecture" in this
case), state module ("auth" in this case), and the name of the action
("UPDATE_EMAIL_VALUE" in this case). That's the value that will be the type for
the action to update email values, the command to tell the store to update the
value for the email.

The next part of the pattern is to create a function that returns an object to
use with that action type. Normally, the function name is the same as the action
name, just in camel case.

```js
const updateEmailValue = value => ({ type: UPDATE_EMAIL_VALUE, value });
```

Most actions are normally arrow functions that take zero or one parameters that
creates the object that you see here with the type property and any data passed
in. The updateEmailValue function takes a parameter named value which will be
the value of the input field.

Actions are almost always exported from their modules because other code uses
them to create the action to dispatch to the store. I'm going to create an
export, here, for actions.

```js
export const actions = {
  updateEmailValue,
};
```

Now, I can use that in my component to send an action, to dispatch an action, to
the Redux store. There's more code that I need to handle this action, code that
I will put into my reducer. However, I am going to use this action, right now,
so you can see what I mean.

Back in LoginForm.js, I'm going to make this a connected component.

```js
import { connect } from 'react-redux';

// ...

export default connect(null)(LoginForm);
```

You can see I haven't a mapStateToProps function, yet, so I just pass in `null`.
I mentioned earlier that connect can take zero, one, or two parameters. I'm now
going to use the second parameter. The second parameter is a function, but what
it does is create utility functions for us to send actions to the store. It is
conventionally called mapDispatchToProps.

```js
const mapDispatchToProps = dispatch => {
  return {

  };
};
```

The parameter it receives is the function that we use to send actions to the
Redux store, conventionally called dispatch. I'd like to create a utility
function, here, that I can use in the onChange method of the email so that when
the value changes, it gets that new value and dispatches it using the
updateEmailValue action that I just created.

```js
import { actions } from './store/auth';

// ...

const mapDispatchToProps = dispatch => {
  return {
    updateEmailValue: event => dispatch(actions.updateEmailValue(event.target.value))
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);
```

I've created the method mapDispatchToProps which takes the dispatch function as
its parameter. The function now returns an object with a key named
updateEmailValue which takes the event as its parameter, passes the target's
value to the updateEmailValue action function. That returns an object that then
gets dispatched to Redux.

I'm going to show you that this function now exists on the properties by
outputting it in the component.

```js
<div>{props.updateEmailValue.toString()}</div>
```

You can see that it's got some weird stuff in there, but it definitely is an
arrow function that dispatches the result of a value. I'm going to get rid of
that and now use it on the email input field.

```js
<input onChange={props.updateEmailValue} type="email" placeholder="Email" required />
```

As you can see, nothing seems to have changed. However, as I type into the email
field, watch the Redux DevTools. You can see that each time I type a letter, an
action gets sent to the Redux store, it gets dispatched to the Redux store. I
will look at the last of these, at the value in the action. You can see that the
type is the string that I had in my action, and the value is the value in the
field.

Now, look at the state of the application. It remains unchanged. I need to
handle that action to update the state based on its type and value.

I now have an action flowing into Redux. However, nothing is happening with this
new data. It's time to address that by adding code to handle the action in the
reducer.

```js
function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_EMAIL_VALUE: {

    }
    default: {
      return state;
    }
  }
}
```

A common way to handle the code in reducers is to use a switch statement based
on the type of action. It is the type of action that tells you what to do in the
reducer. This action is the UPDATE_EMAIL_VALUE action. That means it should
update the email value in the state. Next, when I implement the
UPDATE_PASSWORD_VALUE action, I'll add a new case clause to this switch
statement.

When the value comes in that a new email value exists, I just want to put that
value in the state, overwriting the old value. However, I can't just do this.

```js
function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_EMAIL_VALUE: {
      state.email = action.value;
      return state;
    }
    default: {
      return state;
    }
  }
}
```

I can't do this because, when using Redux, whenever I change a value in an
object, I have to return a new object. What I will do is use the object spread
operator and, then, specify the new email value.

```js
function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_EMAIL_VALUE: {
      return {
        ...state,
        email: action.value,
      };
    }
    default: {
      return state;
    }
  }
}
```

There are other ways to do this exact same thing. However, I like this one, so
I'm going to stick with it. With this in place, now when I type in the email
field, you can see that he state updates, as well. Just to review what is
happening, so far, I created an action type, created an action function to
create the action object, used it in my component to dispatch the action to the
Redux store, and then handled it here in the reducer.

The last thing to do, here, for completeness, is to go back and set the value of
the email input field to the value in the store. That's going to use a property
of the state, so I need to create the mapStateToProps function and map the email
value to the props.

```js

const mapStateToProps = state => {
  return {
    email: state.auth.email,
  };
};

// ...

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
```

Nothing has changed in the way things appear to work. What does happen, though,
is that if something _else_ changes the value of the email, then the UI will
show it.

Now that I have the round-trip from field to action to reducer back to field
value, I'm going to do it all over again for the password field. In the auth.js
file in the store, I'll add the action type, the action method that produces the
action object, and the clause in the reducer to handle the new action type. I'll
also export the new action so I can use it in my components.

```js
const UPDATE_EMAIL_VALUE = 'lecture/auth/UPDATE_EMAIL_VALUE';
const UPDATE_PASSWORD_VALUE = 'lecture/auth/UPDATE_PASSWORD_VALUE';

const updateEmailValue = value => ({ type: UPDATE_EMAIL_VALUE, value });
const updatePasswordValue = value => ({ type: UPDATE_PASSWORD_VALUE, value });

export const actions = {
  updateEmailValue,
  updatePasswordValue,
};

// ...

function reducer(state = initialState, action) {
  switch (action.type) {
    // ...
    case UPDATE_PASSWORD_VALUE: {
      return {
        ...state,
        password: action.value,
      }
    }
    // ...
  }
}

export default reducer;
```

Now that I have those, I can use them in my component.

```js
const LoginForm = props =>
  <form>
    {/* ... */}
    <div>
      <input onChange={props.updatePasswordValue} type="password" placeholder="Password" required />
    </div>
    {/* ... */}
  </form>
;

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateEmailValue: event => dispatch(actions.updateEmailValue(event.target.value)),
    updatePasswordValue: event => dispatch(actions.updatePasswordValue(event.target.value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
```

And, with that, I can update the value of the password in the store, as well.

The last thing that I need to do with this page is to handle the click of the
login button. When I click that button, I want the code to make an AJAX call to
the backend to check if it's a good login. Because I want to use an AJAX call, I
can't just use a normal action and reducer combo. Remember, actions and reducers
must be synchronous and only use the data given to them through their
parameters. This function that I want to write is going to make an AJAX call and
use the data that came back from the server. I need something different. I need
a thunk.

Back here in auth.js, the actions that you've seen are just plain-old objects
with a type property. Thunks are functions. When a thunk is dispatched, the
Redux-Thunk middleware executes your function. In your function, you can make
AJAX calls, read and write to local storage, generate random numbers, do any
sort of thing you want. Then, when you get whatever data you're looking to get,
you dispatch normal actions to consume that data with a reducer to finally get
it into a store.

So, a thunk is a function that returns a function that will get dispatched. I
know, that seems like a lot of words. Sorry. Let me show you.

```js
const tryLogin = () => {
  return async (dispatch, getState) => {

  };
};
```

Here's a function named tryLogin that has no parameters. It returns an async
function that has two parameters, the dispatch function that you've seen
already, and a function conventionally called getState because it allows you to
get the current state of the store. We need that method because that's where the
values for email and password live. That function doesn't have to be async. I
made it that way because I'm going to make an AJAX call and use the await
keyword.

Now, to get the email and password, I'll do that like this.

```js
const { auth: { email, password } } = getState();
```

That's some advanced destructuring, there, I've written code to the get the
email and password off of the object that is stored in the auth property. Once
I have those values, I can make a fetch using the HTTP PUT method containing
those values.

```js
const tryLogin = () => {
  return async (dispatch, getState) => {
    const { auth: { email, password } } = getState();
    const response = await fetch('http://localhost:8000/api/session', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    try {
      if (response.status >= 200 && response.status < 400) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error('Bad response');
      }
    } catch (e) {
      console.error(e);
    }
  };
};
```

Just a normal AJAX call. If the call succeeds or fails, I log something to the
console. I want to now hook this up to the login button to see it work. I'm
going to export the tryLogin function in an object named thunks like I did with
actions above.

```js
export const thunks = {
  tryLogin,
};
```

Over in the LoginForm, I will import that thunk and use it in the
mapDispatchToProps function.

```js
// ...
import { actions, thunks } from './store/auth';

// ...

const mapDispatchToProps = dispatch => {
  return {
    updateEmailValue: event => dispatch(actions.updateEmailValue(event.target.value)),
    updatePasswordValue: event => dispatch(actions.updatePasswordValue(event.target.value)),
    tryLogin: () => dispatch(thunks.tryLogin()),
  };
};
```

Now, I will use the mapped tryLogin as the onClick handler for the button.

```js
<button onClick={props.tryLogin}>Log in</button>
```

Now, when I click the button, I should see something appear in my console.

And, when I type in good credentials, I should see something else appear in my
console.

There's the token. When that token arrives, I want to send it to the store so
that it can update that token in the state. That's just a normal action because
I have all the data I need. So, I will create the update token value action,
now.

```js
const UPDATE_EMAIL_VALUE = 'lecture/auth/UPDATE_EMAIL_VALUE';
const UPDATE_PASSWORD_VALUE = 'lecture/auth/UPDATE_PASSWORD_VALUE';
const UPDATE_TOKEN_VALUE = 'lecture/auth/UPDATE_TOKEN_VALUE';

const updateEmailValue = value => ({ type: UPDATE_EMAIL_VALUE, value });
const updatePasswordValue = value => ({ type: UPDATE_PASSWORD_VALUE, value });
const updateTokenValue = value => ({ type: UPDATE_TOKEN_VALUE, value });

export const actions = {
  updateEmailValue,
  updatePasswordValue,
  updateTokenValue,
};
```

Now that I've created it, I can use it in my thunk to just dispatch the action
to the store.

```js
if (response.status >= 200 && response.status < 400) {
  const data = await response.json();
  dispatch(updateTokenValue(data.token));
} else {
```

I need to write the reducer portion of this to handle the new action.

```js
case UPDATE_TOKEN_VALUE: {
  return {
    ...state,
    token: action.value,
  };
}
```

With those pieces in place, I should be able to log in, now, and access the
movies.

«go log in and access the movies»

When I refresh my page, the page reloads and the store starts out empty, again,
so now I can't access movies.

«refresh page, show no movies access»

I'm going to fix that by writing the token to local storage. Again, because this
is using something outside my application, specifically local storage, I need to
do this in a thunk. I can just do it in the thunk that I already have because it
went and got the token already.

```js
window.localStorage.setItem('REDUX_LECTURE_AUTH_TOKEN', data.token);
```

Now, when I successfully log in, that value should get written to local storage.

«log in, again, and show it in local storage.»

And, there it is. Now, it'd be keen if the application read it from local
storage when it loaded.

To do that, I'll go back to my index.js where the store is created. There, I
will read the value from local storage. Then, I will pass it to the configure
store function with the shape that I expect the state to have, an auth property
with a token value set on it.

```js
const token = window.localStorage.getItem('REDUX_LECTURE_AUTH_TOKEN');

const store = configureStore({ auth: { token } });
```

I need to modify the configureStore function to accept an initial state.

```js
const configureStore = (initialState) => {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
  );
};
```

Now that I have that, when I refresh the page, the token will now be part of the
initial state.

«show that it's part of the initial state»

That means when I am on the movies page and refresh the page, I do not get
redirected.

The last step is the AJAX call to get the movies loaded. Back in the movies
state module, I'll create a thunk to load the movies from an AJAX call and
an action to handle the data once it arrives.

```js
const UPDATE_MOVIES = 'lecture/movies/UPDATE_MOVIES';

const updateMovies = movies => ({ type: UPDATE_MOVIES, movies });

export const actions = {
  updateMovies,
};

const getMovies = () => {
  return async (dispatch, getState) => {
    const { auth: { token } } = getState();
    const response = await fetch("http://localhost:8000/api/movies", {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(updateMovies(data));
  }
}

export const thunks = {
  getMovies,
};

const initialState = [
  { id: 0, title: 'Fake Movie', year: 2024, audienceScore: 4.6 }
];

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_MOVIES: {
      return action.movies;
    }
    default: {
      return state;
    }
  }
}

export default reducer;

```

Now that I have this set up, I'd like to dispatch this whenever the application
loads. I'm going to do that in my index.js file.

```js
const token = window.localStorage.getItem('REDUX_LECTURE_AUTH_TOKEN');

const store = configureStore({ auth: { token } });
store.dispatch(thunks.getMovies());
```

That's just one place to load it. You could also load it when you log in, or you
can change the MovieList component to dispatch that thunk when it loads.

Let's review how this stuff works.

Whenever you have data in your application that you want to put into the state
of the application, like for the form fields, you create an action type, an
action method that returns an action object that contains, at a minimum, a type
property. Then, you write something in the reducer to handle that action type
and return a new object whenever you need to make a change to it.

In the components, you connect the component to your Redux store using the
connect function. If you want to pass values from the state of your application to
the component, you use the mapStateToProps function as the first parameter of
the connect function. If you need to dispatch actions in responses to people
interacting with your components, you use the mapDispatchToProps function to
create these utility functions for use in your component.

Finally, you use thunks when you need to load data from external resources, like
AJAX calls and local storage. The thunk does it's data collection and, when it
gets that data, it normally dispatches normal actions to update the store.

I hope you've enjoyed this whirlwind tour of Redux. You're going to get lots of
practice, today, doing this and more in the Redux project. Have a great day,
developers!
