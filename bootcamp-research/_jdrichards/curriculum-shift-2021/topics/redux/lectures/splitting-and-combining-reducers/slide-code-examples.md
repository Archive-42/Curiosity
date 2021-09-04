
```js
{
  fruit: [
    'APPLE',
    'APPLE',
    'ORANGE',
    'GRAPEFRUIT',
    'WATERMELON',
  ],
  farmers: {
    1: {
      id: 1,
      name: 'John Smith',
      paid: false,
    },
    2: {
      id: 2,
      name: 'Sally Jones',
      paid: false,
    },
  }
}
```

```js
const fruitReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_FRUIT:
      return [...state, action.fruit];
    case ADD_FRUITS:
      return [...state, ...action.fruits];
    case SELL_FRUIT:
      const index = state.indexOf(action.fruit);
      if (index !== -1) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1),
        ];
      }
      return state;
    case SELL_OUT:
      return [];
    case HIRE_FARMER:
      // TODO
      return state;
    case PAY_FARMER:
      // TODO
      return state;
    default:
      return state;
  }
};
```

```js
const fruitReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_FRUIT:
      return [...state, action.fruit];
    case ADD_FRUITS:
      return [...state, ...action.fruits];
    case SELL_FRUIT:
      const index = state.indexOf(action.fruit);
      if (index !== -1) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1),
        ];
      }
      return state;
    case SELL_OUT:
      return [];
    default:
      return state;
  }
};

const farmersReducer = (state = {}, action) => {
  switch (action.type) {
    case HIRE_FARMER:
      // TODO
      return state;
    case PAY_FARMER:
      // TODO
      return state;
    default:
      return state;
  }
};
```
