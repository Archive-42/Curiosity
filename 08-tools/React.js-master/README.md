## Repl.it React.js Template

A lightweight and super fast React.js template. Powered by [esbuild](https://github.com/evanw/esbuild). A few things about it:

- Entry file is `src/App.js`, where React is initialized
- Public files like html, css, and images should go under `/public`
- JavaScript files should live under `src`

## Development process

- Simply write code, add files, etc and hit run
- Esbuild will build your app and if there is an error you'll see it in the console
- If the build is successful you'll see the web output pane refresh

## npm packages

This templates comes with the following dependencies and are installed as part of the project so you're free to change, upgrade, or replace them:

- [esbuild](https://github.com/evanw/esbuild): JavaScript compiler & bundler
- [static-here](https://github.com/amasad/static-here): is a tiny static server
- react and react-dom: because it's a React.js template :-)

To add more packages, whether React.js components, or anything else, you can simply `import` the package and Repl.it will find it and install it for you. You can also use the package manager in the sidebar. Read more about packages in Repl.it [here](https://docs.repl.it/repls/packages).
