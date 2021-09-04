# INTRO TO JSX

## Objectives

- Explain how React uses a tree data structure called the "virtual DOM" to model the DOM
- Use `React.createElement` to create virtual DOM nodes
- Use `ReactDOM.render` to have React render your virtual DOM nodes into the actual Web page
- Use JSX to create virtual DOM nodes
- Describe how JSX transforms into `React.createElement` calls
- Use `Array#map` to create an array of virtual DOM nodes while specifying a unique key for each created virtual DOM node

### Create Element

Syntax: `React.createElement( Type, Props*, ...Children* )`  
Parameters:

- Type: name of the HTML element to create
- Props: OPTIONAL. Any properties/attributes to put on the generated element.
- Children: Any child of the element.

Example:

```javascript
// Put the element tree in a variable
const navList = React.createElement(
  "ul",
  null,
  React.createElement(
    "li",
    { className: "selected" },
    React.createElement("a", { href: "/pets" }, "Pets")
  ),
  React.createElement(
    "li",
    null,
    React.createElement("a", { href: "/owners" }, "Owners")
  )
);

// Get a DOM node for React to render to
const mainElement = document.querySelector("main");

// Give React the element tree and the target
ReactDOM.render(navList, mainElement);
```

### Converting to virtual DOM

`React.render()`

```js
// Put the element tree in a variable
const navList = React.createElement();

// Get a DOM node for React to render to
const mainElement = document.querySelector("main");

// Give React the element tree and the target
ReactDOM.render(navList, mainElement);
```

![alt text](https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/react-example-conversion-real-dom.svg "Logo Title Text 1")

---
