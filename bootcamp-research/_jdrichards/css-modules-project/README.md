# CSS MODULES

In this project, you'll use Create React App to create a simple React
application. You'll experiment with some of the features that Create React App
provides and deploy a production build of your application to a standalone
Express application.

## Phase 0: Setup

Begin by using the [create-react-app] package to create a React application:

```sh
npx create-react-app css-modules --template @appacademy/react-v17
```

> Remember that using the `create-react-app` command initializes your project
> as a Git repository. If you use the `ls -a` to view the hidden files in your
> project, you'll see the `.git` file.

Update the `App` component:

- Wrap the `<h1>` element with a `<div>` element; and
- Change the `<h1>` element content to something like "Exploring CSS Modules".

```js
// ./src/App.js

import React from 'react';

function App() {
  return (
    <div>
      <h1>Exploring CSS Modules</h1>
    </div>
  );
}

export default App;
```

## Phase 1: Using CSS modules

You've already seen an example of using the `import` keyword to import a
stylesheet into a module so that it'll be included in your application build.
That's the technique being used to include the global `index.css` stylesheet:

```js
// ./src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

You can also leverage [CSS modules][css modules] in your Create React App
projects. CSS Modules scope stylesheet class names so that they are unique to a
specific React component. This allows you to create class names without having
to worry if they might collide with class names used in another component.

Add a new `components` folder to the `src` folder. Within that folder, add the
following folders:

- HeadingA
- HeadingB

Add an `index.js` file to each folder.
Add a `HeadingA.module.css` to the `HeadingA` folder and a
`HeadingB.module.css` to the HeadingB folder.

Then update the contents of each file to the following:

```js
// ./src/components/HeadingA/index.js

import React from 'react';
import styles from './HeadingA.module.css';

function HeadingA() {
  return <h1 className={styles.heading}>Heading A</h1>;
}

export default HeadingA;
```

```css
/* ./src/components/HeadingA/HeadingA.module.css */

.heading {
  color: green;
}
```

```js
// ./src/components/HeadingB/index.js

import React from 'react';
import styles from './HeadingB.module.css';

function HeadingB() {
  return <h1 className={styles.heading}>Heading B</h1>;
}

export default HeadingB;
```

```css
/* ./src/components/HeadingB/HeadingB.module.css */

.heading {
  color: red;
}
```

Notice how the `.heading` CSS class name is being used within each component to
set the color of the `<h1>` element. For the `HeadingA` component, the color is
`green`, and for the `HeadingB` component, the color is `red`. Using the file
naming convention `[name].module.css` let's Create React App know that we want
these stylesheets to be processed as CSS Modules. Using CSS Modules allows the
`.heading` class name to be reused across components without any issue.

To see this feature in action, update your `App` component to render both of
your new components:

```js
import React from 'react';
import HeadingA from './components/HeadingA';
import HeadingB from './components/HeadingB';

function App() {
  return (
    <div>
      <h1>Exploring React Builds</h1>
      <HeadingA />
      <HeadingB />
    </div>
  );
}

export default App;
```

Then run your application (`npm start`) to see "Heading A" and "Heading B"
displayed respectively in green and red. If you use the browser's developer
tools to inspect "Heading A", you'll see that the `.heading` class name has been
modified so that it's unique to the `HeadingA` component.

CSS Modules is an example of how a front-end build process can be used to modify
code to enable a feature that's not natively supported by browsers.

## Phase 2: Using an image in a component

Create React App configures webpack with support for loading images (as well as
CSS, fonts, and other file types). What this means, for you as the developer, is
that you can add an image file to your project, import it directly into a
module, and render it in a React component.

Download any image of off the Web or [click here][react builds cat] to download
the below image.

![react builds cat]

Then within the `src` folder add a new folder named `Imager`. Within that folder
add a new component file named `index.js`. Also add your downloaded image file
to the `Imager` folder (so it's a sibling to the `index.js` file).

Update the contents of the `index.js` file to this:

```js
// ./src/components/Imager/index.js

import React from 'react';
import cat from './react-builds-cat.png';

function Imager() {
  // Import result is the URL of your image.
  return <img src={cat} alt='Cat' />;
}

export default Imager;
```

You can import an image into a component using the `import` keyword. This tells
webpack to include the image in the build. Notice that when you import an image
into a module, you'll get a path to the image's location within the build. You
can use this path to set the `src` attribute on an `<img>` element.

> Be sure to update the image `import` statement to the correct file name if
> you're using your own image!

Now update the `App` component to import and render the `Image` component:

```js
// ./src/App.js

import React from 'react';
import HeadingA from './components/HeadingA';
import HeadingB from './components/HeadingB';
import Imager from './components/Imager';

function App() {
  return (
    <div>
      <h1>Exploring React Builds</h1>
      <HeadingA />
      <HeadingB />
      <Imager />
    </div>
  );
}

export default App;
```

If you run your application (`npm start`) you'll see your image displayed on the
page! You can also open your browser's developer tools and view the "Sources"
for the current page. If you can expand the `localhost:3000` > `static` >
`media` node on the left, you can see the image file that webpack copied to your
build.


### Images in stylesheets

You can also reference images in your CSS files too. Add a CSS file named
`Image.module.css` to the `./src/image` folder and update its contents to this:

```css
/* ./src/components/Imager/Imager.module.css */

.cat {
  background-image: url(./react-builds-cat.png);
  width: 400px;
  height: 400px;
}
```

Then update the `Imager` index.js component to this:

```js
// ./src/components/Imager/index.js

import React from 'react';
import styles from './Image.module.css';
import cat from './react-builds-cat.png';

function Imager() {
  return (
    <div>
      {/* Import result is the URL of your image. */}
      <img src={cat} alt='Cat' />
      <div className={styles.cat}></div>
    </div>
  );
}

export default Imager;
```

Now you'll see the image displayed twice on the page!

**Note: This approach will not work when adding external CSS for HTML elements, only classes. It is recommended to place HTML element CSS inside the App.css file**

[create-react-app]: https://github.com/facebook/create-react-app
[react builds cat]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/react-builds/assets/react-builds-cat.png
[react builds css modules]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/react-builds/assets/react-builds-components.png
[css modules]: https://github.com/components/components
[`webpack-dev-server`]: https://webpack.js.org/configuration/dev-server/
[browserl.ist]: https://browserl.ist

