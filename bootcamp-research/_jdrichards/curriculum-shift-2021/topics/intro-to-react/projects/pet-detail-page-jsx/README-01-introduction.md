# JSX Walk-Through: Create React App

You will use the analysis presented in _Thinking In Components_ in this
walk-through. Here's the image of the final breakdown. It shows components
that will be named

* `PetDetailPage`
* `Navigation`
* `PetDetails`
* `PetDetailList`
* `PetInformationItem`
* `OwnersList`
* `OwnerLink`

![Petrack component analysis]

At the end of this walk-through, you will have reproduced this page using JSX,
`React.render`, and an AJAX call.

Since you're using JSX, you will use a common tool set to work with this, a
fancy tool set that does things like automatically refresh your browser for you
when you make changes!

## Getting started

If you haven't already, install the [React DevTools for Google Chrome].

![React DevTools for Google Chrome screenshot]

Now, you will use the _Create React App_ tool to generate a skeleton project for
you that uses a whole bunch of tools that makes your development easier. Open up
a Terminal and change directory to a place where you want the project directory
created. Then, execute the following command.

```shell
npx create-react-app pet-detail-page-jsx
```

This will create a React application for you that can understand JSX. It may
take a long while for it to finish creating the project and installing the
dependencies. (At the time of this writing, it will end up installing 1030
packages in the **node_modules** directory.)

Once it finishes, change the working directory into the newly created
**pet-detail-page-jsx** directory. Open the code in Visual Studio Code. Once
that opens, type `npm start`. That will start the application for you and open
up a new tab (or window) in Google Chrome to show you the default page.

![Default create-react-app application]

Wow! Look at that neat thing spin.

## Project layout

Ignoring the **node_modules** directory and its 1000+ subdirectories, here is
what the _Create React App_ tool generated for you.

```
pet-detail-page-jsx
├── README.md             A generic README for a generated project
├── package-lock.json     The package lock file
├── package.json          The package.json file
├── public                A directory to contain static images
│   ├── favicon.ico       The fancy icon to show up in the tab
│   ├── index.html        The skeleton HTML file React will put its DOM into
│   ├── logo192.png       A small version of the React logo
│   ├── logo512.png       A larger version of the React logo
│   ├── manifest.json     A manifest file for mobile device screen shortcuts
│   └── robots.txt        A robots.txt file
└── src
    ├── App.css           The App component's CSS
    ├── App.js            The App component
    ├── App.test.js       Test for the App component
    ├── index.css         CSS for the entire site
    ├── index.js          The code the renders the App component
    ├── logo.svg          The fancy spinning React logo
    ├── serviceWorker.js  A service worker for React apps
    └── setupTests.js     A file to set up tests
```

As you make more and more React projects with Create React App during the
upcoming projects, more and more will be revealed to you about how to use these
generated files.

You should do what the instructions tell you and try editing some of the files.
(You're going to see some weird stuff in those files. There are some
explanations for the weird stuff in the next section.) Open the **src/App.js**
file and edit and save it. Watch the browser change with it. Take a look around
the generated files. **DO NOT** delete the line `serviceWorker.unregister();` in
**src/index.js**. Doing that will cause your local development environment all
kinds of trouble.

When you finish with playing around with styles and components, stop the
application running in your terminal.

## Important observations

Because the tools that _Create React App_ installed are making JavaScript for
you from the JSX files, all of the JSX files are getting read and bundled
up into other JavaScript files that are sent to the browser. What you write in
all of the JavaScript files in the **src** directory are _not_ the files that
are sent to the browser.

The _Create React App_ tool created a project for you that uses a tool called
[Webpack]. Webpack reads a bunch of different types of files, CSS, images,
JavaScript, and bundles them up _into_ JavaScript files.

If you look inside **src/index.js**, you'll see this statement.

```js
import './index.css';
```

That doesn't make _ANY SENSE_! That's because the **src/index.js** file is _not_
what the browser sees. Instead, Webpack figures out that the file imports the
CSS file **src/index.css**, reads all of that CSS, turns it _into JavaScript_,
and removes that import statement from what it will send to your browser.

Try typing `npm run build`. That will create a **build** directory. If you look
inside **build/static/js**, you will see the files that Webpack creates to send
to the browser. They're named things like **2.7caf6610.chunk.js** and
**main.b875719a.chunk.js**. That's what Webpack sends to the browser, not your
lovely **index.js**.

**MAGIC!**

Not really. But, if you see an import in the JavaScript files that doesn't make
sense, like importing the **logo.svg** file, that's what's going on.

Another thing to note is that the imports for other components _do not end with
.js_. That's because Webpack is smart enough to know that you mean a JavaScript
file because, when it is building the stuff that it will send to the browser, it
can _see_ all of the files in the directories and figure out which ones are
referenced by the `import` statement.

The browser can't do that because it could be on the other side of the world
from where the Web server is. That's why, in ES modules in the browser, you have
to specify the **.js** extension, so the browser can _get_ the correct resource
from the server.

## Clean up the cruft

It's time to get rid of the stuff you won't need for this exercise. Delete the
following files:

* In the **public** directory:
  * **logo192.png**
  * **logo512.png**
  * **robots.txt** (If you'd like to know more about what this files does, [here's a link].)
* In the **src** directory:
  * **App.css**
  * **App.test.js** (You will learn more about testing later.)
  * **logo.svg**
  * **serviceWorker.js**
  * **setupTests.js**
* In the top-level directory:
  * **README.md**

Because you deleted those files, the application will not build, now. If you try
running it with `npm start`, you should see some an error about **App.css**
missing. Open up **src/App.js** and remove the following lines.

* `import logo from './logo.svg';`
* `import './App.css';`

Then, delete everything between the parentheses of the `return` statement and
replace it with some JSX that shows an `h1` element with the message "Hello".
Your edits should result in a file that has this content.

```jsx
import React from 'react';

function App() {
  return (
    <h1>Hello</h1>
  );
}

export default App;
```

When you save that file, it will try to build your project, again, and this time
complain about the missing **serviceWorker** file. Open up **src/index.js** and
remove the lines

* `import * as serviceWorker from './serviceWorker';`
* `serviceWorker.unregister();`

You can delete the big comment at the bottom of the file, too, because it will
no longer be relevant. When you complete those edits, you should now see "Hello"
in the browser. The **index.js** file should look like this.

```jsx
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

At this point, things will build, but you'll still see an error in your
browser's DevTools complaining about the missing **logo192.png** file. Open up
**src/manifest.json** and remove the icons property and the array that is its
value. Also, change the short name to "Petrack" and the name to "Petrack". Save
that. The error in the console should go away. The manifest file should look
like this, now.

```json
{
  "short_name": "Petrack",
  "name": "Petrack",
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

The title of the Web page still reads "React App". To change that, open up the
**public/index.html** file and update the `title` element to read "Petrack".

Go ahead and initialize a Git repository, add, and commit your files. This is
the baseline. From here on out, you can modify files with impunity!

## Set site-wide styles

In the file **src/index.css**, replace all of its contents with this.

```css
body {
  padding: 50px;
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
}

a {
  color: #00B7FF;
}

label {
  display: block;
  margin-bottom: .5em;
}

input {
  display: block;
  margin-bottom: 1em;
}
```

Now, it's time to get the pet details page working.

## What you've learned

In this, you were able to create a new React application with lots of tools
using the _Create React App_ command-line tool. You then deleted a bunch of
non-JavaScript and JavaScript files that you didn't need. You learned that by
doing that, you broke the build because Webpack, the tool that _Create React
App_ uses to bundle files, can read more than just JavaScript files; it can
read CSS files, images, and more.


[Petrack component analysis]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/pettrack-pet-detail-all-components-with-details-list.png
[React DevTools for Google Chrome]: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
[React DevTools for Google Chrome screenshot]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/react-devtools.png
[Default create-react-app application]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/create-react-app-default-app.png
[link to the solution]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/projects/solutions/pet-detail-page-jsx-solution-20200407.zip
[here's a link]: https://en.wikipedia.org/wiki/Robots_exclusion_standard
[Webpack]: https://webpack.js.org/
