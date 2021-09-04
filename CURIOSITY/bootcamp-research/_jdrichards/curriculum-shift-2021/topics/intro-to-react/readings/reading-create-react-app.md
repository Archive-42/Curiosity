
# Create React App

[Create React App] is a tool developed by Facebook that provides boilerplate
code and setup for a React application. It comes with a whole bunch of tools
that make your development life easier. Here, you will learn how to use the
Create React App tool and setup your own stripped down boilerplate code for use
in future projects at App Academy.

## Getting started

Install the [React DevTools for Google Chrome] extenstion.

![React DevTools for Google Chrome screenshot]

Now, you will use the _Create React App_ tool to generate a skeleton project.

Install the `create-react-app` npm package globally.

```shell
npm install -g create-react-app
```

Open up a Terminal and change directory to a place where you want the project
directory created. Then, execute the following command.

```shell
npx create-react-app react-template --use-npm
```

This will create a React application for you that can understand JSX. It may
take a while for it to create the project and install the dependencies. (At
the time of this writing, it installs 1030 packages in the **node_modules**
directory.) The `--use-npm` flag is necessary to indicate you want to use
`npm` instead of `yarn` as a package manager.

Once it finishes, move into the newly created **react-template** directory.
Initialize the project directory as a Git repository. Notice that
_Create React App_ has already generated a `.gitignore` file for you.

**Pro-Tip**: After every step that you get something to work, take a moment to
add and commit those changes to your repository. That way, if you make some
changes that really mess things up, you can go back to the last working commit
using `git restore .` or `git checkout -- .` This is a _great_ way to avoid
messing something up so much that you can't _Undo_ your way out of it.

Next, open the code in VSCode and type `npm start`. That will start the
application for you and open up a new tab (or window) in Google Chrome to show
you the default page.

![Default create-react-app application]

Wow! Look at that neat thing spin.

**Add and commit your inital project setup code.**

## Project layout

Ignoring the **node_modules** directory and its 1000+ subdirectories, here is
what the _Create React App_ tool generated for you.

```plaintext
react-template
├── README.md               A generic README for a generated project
├── package-lock.json       The package lock file
├── package.json            The package.json file
├── public                  A directory to contain static images
│   ├── favicon.ico         The fancy icon to show up in the tab
│   ├── index.html          The skeleton HTML file React will put its DOM into
│   ├── logo192.png         A small version of the React logo
│   ├── logo512.png         A larger version of the React logo
│   ├── manifest.json       A manifest file for mobile device screen shortcuts
│   └── robots.txt          A robots.txt file
└── src
    ├── App.css             The App component's CSS
    ├── App.js              The App component
    ├── App.test.js         Test for the App component
    ├── index.css           CSS for the entire site
    ├── index.js            The entry file, code that renders the App component
    ├── logo.svg            The fancy spinning React logo
    ├── reportWebVitals.js  A performance measurement tool for the application
    └── setupTests.js       A file to set up tests
```

As you make more React projects with Create React App, more and more will be
revealed about how to use these generated files.

Do what the instructions tell you and try editing some of the files. You'll see
some weird stuff in those files which will be explained in the next section.
Open the **src/App.js** file, then edit and save it. Watch the browser change
when you do. Take a look at the generated files and see if you understand what's
going on.

When you finish with playing around with styles and components, stop the
application in your terminal (`CMD + C` for MacOS, `CTRL + C` for
Windows/Linux).

## Important observations

Because the tools that _Create React App_ installed are making JavaScript for
you from the JSX files, all of the JSX files are getting read and bundled
up into other JavaScript files that are sent to the browser. What you write in
all of the JavaScript files in the **src** directory are _not_ the files that
are sent to the browser.

The _Create React App_ tool created a project for you that uses a tool called
[Webpack]. Webpack reads a bunch of different types of files, CSS, images,
JavaScript, and bundles them up _into_ JavaScript files.

The **src/index.js** file is the **entry file**. All JavaScript files imported
into this file will be bundled up by Webpack into a single JavaScript file.

You may see other non-JavaScript files imported. If you look inside
**src/index.js**, you'll see this statement.

```js
import './index.css';
```

That doesn't make _ANY SENSE_! ES6 imports in JavaScript are normally only
supposed to import JavaScript files. Importing CSS files are not supported by
default. But, the **src/index.js** file is _not_ what the browser sees. Instead,
Webpack figures out that the file imports the CSS file **src/index.css**, reads
all of that CSS, turns it _into JavaScript_, and removes that import statement
from what it will send to your browser.

Try typing `npm run build`. That will create a **build** directory. If you look
inside **build/static/js**, you will see the files that Webpack creates to send
to the browser. They're named things like **2.7caf6610.chunk.js** and
**main.b875719a.chunk.js**. That's what Webpack sends to the browser, not your
entry file, **index.js**.

The downside of sending multiple files is that you need to determine which files
should be loaded first. With Webpack, you don't need to worry about this because
you are sending one JavaScript file bundling all your files together.

It's not really magic. But, if you see an import in the JavaScript files that
doesn't make sense, like importing the **logo.svg** file, you can assume that
Webpack is working behind the scenes bundle all your files, not just JavaScript
files, together.

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

It's time to get rid of the stuff you won't need for this exercise such as
images and files that display the template text and images. Delete the
following files:

* In the **public** directory:
  * **logo192.png**
  * **logo512.png**
  * **robots.txt** (If you'd like to know more about what this files does,
    [here's a link][robots.txt].)
* In the **src** directory:
  * **App.css**
  * **App.test.js** (You will learn more about testing later.)
  * **logo.svg**
  * **reportWebVitals.js**
  * **setupTests.js**

Because you deleted those files, the application will not build, now.

Start the React development server by running `npm start`. If you try running it
now, you should see some an error about **App.css** missing. Open up
**src/App.js** and remove the following lines.

* `import logo from './logo.svg';`
* `import './App.css';`

Then, delete everything between the parentheses of the `return` statement and
replace it with some JSX that shows an `h1` element with the message, "Hello
from App". Your edits should result in a file that has this content.

```jsx
// ./src/App.js
function App() {
  return (
    <h1>Hello from App</h1>
  );
}

export default App;
```

When you save that file, it will try to build your project again and this time
complain about the missing **reportWebVitals** file. Open up **src/index.js**
and remove the lines:

* `import reportWebVitals from './reportWebVitals';`
* `reportWebVitals();`

You can delete the big comment at the bottom of the file too, because it will
no longer be relevant. When you complete those edits, you should now see, "Hello
from App" in the browser. The **index.js** file should look like this.

```jsx
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

At this point, things will build but you'll still see an error in your
browser's DevTools complaining about the missing **logo192.png** file. Open up
**public/manifest.json** and remove the icons property and the array that is its
value. Also, change the short name to "React Template" and the name to "Create
React App Template". Save that. The error in the console should go away. The
manifest file should look like this, now.

```json
{
  "short_name": "React Template",
  "name": "Create React App Template",
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

The title of the Web page still reads "React App". To change that, open up the
**public/index.html** file and update the `title` element to read "React
Template".

The **src/index.css** file is where all the site-wide (not component-specific)
CSS style rules should be defined. Remove all the default styling in the
**src/index.css** file and add this comment:

```css
/* TODO Add site wide styles */
```

**Add and commit your files.** This is the baseline. From here on out, you can
modify files with impunity!

To use this React template project, you can use this baseline, or you can use
[App Academy's Create React App template] by running the following command:

```shell
npx create-react-app <project-folder-name> --template @appacademy/react-v17 --use-npm
```

Replace `<project-folder-name>` with the name of the project folder you want to
create with the template.

## What you've learned

In this, you were able to create a new React application with lots of tools
using the _Create React App_ command-line tool. You then deleted a bunch of
non-JavaScript and JavaScript files that you didn't need. You learned that by
doing that, you broke the build because Webpack, the tool that _Create React
App_ uses to bundle files, can read more than just JavaScript files; it can
read CSS files, images, and more. If you import files that don't exist anymore,
Webpack cannot compile your files and will give you an error.

[Create React App]: https://github.com/facebook/create-react-app
[React DevTools for Google Chrome]: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
[React DevTools for Google Chrome screenshot]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/react-devtools.png
[Default create-react-app application]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/assets/create-react-app-default-app.png
[link to the solution]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/intro-to-react/projects/solutions/react-template-solution-20200407.zip
[robots.txt]: https://en.wikipedia.org/wiki/Robots_exclusion_standard
[Webpack]: https://webpack.js.org/
[App Academy's Create React App template]: https://www.npmjs.com/package/@appacademy/cra-template-react-v17
