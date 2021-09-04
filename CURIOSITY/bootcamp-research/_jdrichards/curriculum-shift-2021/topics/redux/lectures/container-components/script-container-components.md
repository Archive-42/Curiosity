
# Container Components

[slides]

<slide1>

<slide2> Hi there! This is James.

As you've seen, there can be quite a bit of code involved in connecting a React
component to a Redux store. Placing all of that code into a component along with
the rendering logic tends to create bloated components and violate the principle
of separation of concerns. Because of that, when using Redux with React, it's a
common pattern to separate presentational components from their connected
counterparts, called containers.

In this video, I'll explore how container components differ from presentational
components. I'll also write a container component to handle all of the Redux
store interaction for one or more presentational components.

<slide3> The distinction between presentational components and containers is
functional, not technical. While presentational and container components are
both React components, presentational components are concerned with how things
look and container components are concerned with how things work.

<slide4> Here's a table outlining the differences. As I just mentioned,
presentational components are concerned with how things look--rendering the
markup and styles for the UI. Container components are concerned with how things
work--interacting with the Redux store to retrieve or update state data.

To that end, presentational components aren't aware of the Redux, while
container components are. Presentational components read data from their props
and container components subscribe to Redux state. To change data,
presentational components invoke callback functions passed via props while
container components dispatch Redux actions.

<slide5> In this video, I'm going to refactor a React component that interacts
with a Redux store into presentational and container components.

<slide6> To do that, I'll create a container component that wraps the original
component by rendering it within its `render` method.

<slide7> Then I'll lift up the Redux related code from the wrapped component
into the container component.

<slide8> And lastly, I'll update the container component to pass state data and
dispatch callbacks down into the wrapped component, which will be updated to
render data from its props and handle user actions by calling callbacks passed
by its props.

This results in components that are focused on distinct responsibilities: a
presentational component that accepts and renders data and responds to user
generated events and a container component that handles all of the interaction
with the Redux store.

<slide9> Also, just a little heads up about the approach I'll be using in this
video. For now, you'll manually create container components by hand. Later in
this lesson, you'll learn how to create container components using the
React-Redux library's `connect` method.

<slide10> Not every component needs to be connected to the store. Often you'll
only create containers for the 'big' components in your app that represent
sections of a page. These larger container components are responsible for
interacting with the store and passing state and dispatch props down to all
their presentational children.

<slide11> For the Fruit Stand application, I'll create two container components,
`FruitManagerContainer` and `FarmerManagerContainer`, to render the
presentational components for the "Fruit" and "Farmers" sections of the page.

Notice that the container component names are a combination of the name of the
presentational component that they wrap and the suffix "Container".

In general, aim to have fewer containers rather than more. Most components will
be presentational, but a few containers are needed to connect presentational
components to the Redux store.

<slide12> Let's get started with writing code and creating a container
component!

<switch to vs code> The `FruitManager` component is responsible for rendering
each of the fruit-related components--`FruitList`, `FruitSeller`,
`FruitQuickAdd`, and `FruitBulkAdd`--so I'll create a container component named
`FruitManagerContainer` to handle all of the store interaction for the "Fruit"
section of the page. <stop teleprompter>

```js
// ./src/components/FruitManagerContainer.js

import React from 'react';
import store from '../store';
import FruitManager from './FruitManager';

class FruitManagerContainer extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const { fruit } = store.getState();

    return (
      <FruitManager fruit={fruit} />
    );
  }
}

export default FruitManagerContainer;
```

<start teleprompter> Notice that the container component, just like the current
`FruitList` component, subscribes to the store using `store.subscribe` to know
when state has been updated and calls `store.getState` to retrieve the `fruit`
state slice. But instead of directly rendering the `fruit` state, it sets a prop
on the `FruitManager` component to pass the state down the component hierarchy.

Now I need to update the `FruitManager` component to receive the `fruit` prop
and pass it down to the `FruitList` component... <stop teleprompter>

```js
// ./src/components/FruitManager.js

import React from 'react';
import FruitList from './FruitList';
import FruitSeller from './FruitSeller';
import FruitQuickAdd from './FruitQuickAdd';
import FruitBulkAdd from './FruitBulkAdd';

const FruitManager = ({ fruit }) => {
  return (
    <div>
      <h2>Available Fruit</h2>
      <FruitList fruit={fruit} />
      <h2>Fruit Inventory Manager</h2>
      <FruitSeller />
      <FruitQuickAdd />
      <FruitBulkAdd />
    </div>
  );
};

export default FruitManager;
```

And finally, the `FruitList` component needs to be updated to use the `fruit`
prop to render the list of fruit... I can also remove these lifecycle methods as
this component no longer needs to listen for state updates... And now I can
refactor this component into a function component.

```js
// ./src/components/FruitList.js

import React from 'react';

const FruitList = ({ fruit }) => {
  return (
    <div>
      {fruit.length > 0
        ? <ul>{fruit.map((fruitName, index) => <li key={index}>{fruitName}</li>)}</ul>
        : <span>No fruit currently in stock!</span>
      }
    </div>
  );
};

export default FruitList;
```

And lastly, I can remove this `import` statement, as the `FruitList`
presentational component no longer needs to import the `store`, as it simply
receives and renders the `fruit` state via a prop without any knowledge of or
direct interaction with the store.

Test the app...

Now I'll update the `FruitManagerContainer` component to dispatch an action to
the store. Import the `addFruit` action creator... and a new component method
named `add` that receives a `fruit` parameter value and calls `store.dispatch`
to dispatch a `ADD_FRUIT` action... the `render` method needs to set a prop on
the `FruitManager` component to pass the `add` method down the component
hierarchy...

```js
// ./src/components/FruitManagerContainer.js

import React from 'react';
import store from '../store';
import { addFruit } from '../actions/fruitActions';
import FruitManager from './FruitManager';

class FruitManagerContainer extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  add = (fruit) => {
    store.dispatch(addFruit(fruit));
  }

  render() {
    const { fruit } = store.getState();

    return (
      <FruitManager
        fruit={fruit}
        add={this.add} />
    );
  }
}

export default FruitManagerContainer;
```

Next, I'll update the `FruitManager` component to receive the `add` prop and use
a prop to pass it down to the `FruitQuickAdd` component...

```js
// ./src/components/FruitManager.js

import React from 'react';
import FruitList from './FruitList';
import FruitSeller from './FruitSeller';
import FruitQuickAdd from './FruitQuickAdd';
import FruitBulkAdd from './FruitBulkAdd';

const FruitManager = ({ fruit, add }) => {
  return (
    <div>
      <h2>Available Fruit</h2>
      <FruitList fruit={fruit} />
      <h2>Fruit Inventory Manager</h2>
      <FruitSeller />
      <FruitQuickAdd add={add} />
      <FruitBulkAdd />
    </div>
  );
};

export default FruitManager;
```

And finally, I'll update the `FruitQuickAdd` component's `addFruitClick` event
handler to call the `add` callback function via its props... I can also remove
the Redux related import statements... this component can also be converted to a
function component...

```js
// ./src/components/FruitQuickAdd.js

import React from 'react';

const FruitQuickAdd = ({ add }) => {
  const handleClick = (event) => add(event.target.innerText);

  return (
    <div>
      <h3>Quick Add</h3>
      <button onClick={handleClick}>APPLE</button>
      <button onClick={handleClick}>ORANGE</button>
    </div>  
  );
};

export default FruitQuickAdd;
```

Test the app again...

<start teleprompter> The change between the original and refactored
`FruitQuickAdd` component isn't as dramatic as the `FruitList` component, but
it's still a significant improvement to the overall separation of concerns. The
`FruitQuickAdd` component is now strictly concerned with rendering the UI and
handling user button clicks, leaving all of the interaction with the Redux store
to the `FruitManagerContainer` component.

The `FruitManagerContainer` component can continue to be expanded until each of
its child presentational components no longer interacts directly with the store.
<stop teleprompter>

I'll finish up by removing the Redux related code from the `FruitSeller` and
`FruitBulkAdd` components...

```js
// ./src/components/FruitManagerContainer.js

import React from 'react';
import store from '../store';
import { addFruit, addFruits, sellFruit, sellOut } from '../actions/fruitActions';
import FruitManager from './FruitManager';

class FruitManagerContainer extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  add = (fruit) => {
    store.dispatch(addFruit(fruit));
  }

  addBulk = (fruit) => {
    store.dispatch(addFruits(fruit));
  }

  sell = (fruit) => {
    store.dispatch(sellFruit(fruit));
  }

  sellAll = () => {
    store.dispatch(sellOut());
  }

  render() {
    const { fruit } = store.getState();
    const distinctFruit = Array.from(new Set(fruit)).sort();

    return (
      <FruitManager
        fruit={fruit}
        distinctFruit={distinctFruit}
        add={this.add}
        addBulk={this.addBulk}
        sell={this.sell}
        sellAll={this.sellAll} />
    );
  }
}

export default FruitManagerContainer;
```

```js
import React from 'react';

const FruitSeller = ({ distinctFruit, sell, sellAll }) => {
  if (distinctFruit.length === 0) {
    return null;
  }

  const handleSellClick = (event) => sell(event.target.innerText);

  return (
    <div>
      <h3>Sell</h3>
      {distinctFruit.map((fruitName, index) => (
        <button key={index} onClick={handleSellClick}>{fruitName}</button>
      ))}
      <button onClick={sellAll}>SELL OUT</button>
    </div>
  );
};

export default FruitSeller;
```

Test the app one more time...

<start teleprompter> Now it's time to create the `FarmerManagerContainer`
component. This is the perfect chance to get a bit of practice on your own to
help you cement what you've learned up to this point.

If you're following along, go ahead and pause the video and give it a try...
even if you're not following along, pause the video and think about what needs
to be done to create the container and presentational components.

When you're ready, you can review the completed application in the
redux-fruit-stand-examples repo. <show repo in the browser>

And that's it for this video! Thanks for watching and I'll see you next time!

[slides]: https://docs.google.com/presentation/d/1Ux1bU-0U6eEX4sdpiQmEoLjEnGbwRiwPs3sHp3PzQ5E/edit#
