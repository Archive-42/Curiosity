# Vocabulary

**State**
Ex: "Redux is a state manager."

The state of a program means all the information stored by that program at a particular point in time. It is generally used to refer to the data stored by the program at a particular instance in time, as opposed to the logic of the program, which doesn't change over time. The job of Redux is to store the state of your app and make it available to entire app.

**Store**
Ex: "Redux stores state in a single store."

The Redux store is a single JavaScript object with a few methods, including getState, dispatch(action), and subscribe(listener). Any state you want Redux to handle is held in the store.

**Actions**
Ex: "The Redux store is updated by dispatching actions."

An action is a POJO (plain old JavaScript object) with a type property. Actions contain information that can be used to update the store. They can be dispatched, i.e. sent to the store, in response to user actions or AJAX requests. Typically Redux apps use functions called action creators that return actions. Action creators can take arguments which allow them to customize the data contained in the actions they generate.

**Pure functions**
Ex: "Redux reducers are pure functions."

A function is pure if its behavior depends only its arguments and it has no side effects. This means the function can't depend on the value of any variables that aren't passed to it as arguments, and it can't alter the state of the program or any variable existing outside itself. It simply takes in arguments and returns a value.

**Reducer**
Ex: "Redux handles actions using reducers."

A reducer is a function that is called each time an action is dispatched. The reducer receives an action and the current state as arguments and returns an updated state.

Redux reducers are required to be pure functions of the dispatched action and the current state. This makes their behavior very predictable and allows their effects to potentially be reversed.

**Middleware**
Ex: "You can customize your response to dispatched actions using middleware."\*\*

Middleware is an optional component of Redux that allows custom responses to dispatched actions. When an action is dispatched, it passes through each middleware that has been added to the state. The middleware can take some action in response and choose whether or not to pass the action on down the chain. Behind the scenes, the middleware actually replaces the dispatch method of the store with a customized version. There is a large ecosystem of existing middleware ready to be plugged into any Redux projects. One example is a logger that records each action before passing it on to the reducer. Perhaps the most common use for middleware is to dispatch asynchronous requests to a server.

**Time traveling dev tools**
Ex: "Redux has time traveling dev tools."

Redux reducers are pure functions of the dispatched action and the current state. This means that if one were to store a list of the previous states over time and the actions that had been dispatched, one could retroactively cancel an action and recalculate the state as if that action had never been dispatched. This is precisely the functionality that the Redux DevTools provide. The dev tools can be added as middleware to any Redux project. They allow you to look back through the history of the state and toggle past actions on and off to see a live recalculation of the state. This ability to revert to a previous state is what is meant by time travel.

**Thunks**
Ex: "Thunks are a convenient format for taking asynchronous actions in Redux."

The traditional approach to middleware closely parallels the format of reducers. The actions being dispatched are POJOs with types and various middleware files are waiting to receive them. These files check the type of the action using a case statement just like reducers.

Thunks are an alternative approach. A thunk is a general concept in computer science referring to a function whose primary purpose is simply to call another function. In Redux a thunk action creator returns a function rather than an object. When they are dispatched, thunk actions are intercepted by a piece of middleware that simply checks if each action is a function. If it is, that function is called with the state and dispatch as arguments, otherwise it is passed on down the chain. Thunks are most commonly used to make asynchronous API requests.
