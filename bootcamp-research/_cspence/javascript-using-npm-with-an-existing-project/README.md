
# Using npm with an Existing Project

Most of your time working as a developer won't be spent creating new
applications, but rather maintaining existing applications. npm is useful
throughout the lifetime of a application, so let's practice using npm with an
existing project.

In this project, you'll:

* clone an existing project from a GitHub repository;
* use npm to install the project's dependencies;
* run each of the project's npm scripts;
* use npm to remove a dependency;
* and use npm to update a dependency.

## Phase 1: Using npm with an existing project

Let's get started!

### Phase 1A: Setting up the project

To set up the project, clone the following GitHub repository:

[https://github.com/appacademy-starters/javascript-using-npm-with-an-existing-project][repo
to clone]

Then use npm to install the project's dependencies.

### Phase 1B: Running the provided scripts

After installing the project's dependencies, you can test your project by
running each of the provided npm scripts that are defined in the `package.json`
file:

```js
{
  "scripts": {
    "start": "node index.js",
    "test": "mocha"
  }
}
```

Running the `start` script will start the application and display three
knock-knock jokes in the terminal:

```
Knock, knock.
Who’s there?
Abby.
Abby who?
Abby birthday to you!

Knock, knock.
Who’s there?
Lettuce.
Lettuce who?
Lettuce in. It's cold out here!

Knock, knock.
Who’s there?
Bed.
Bed who?
Bed you can not guess who I am.
```

Running the `test` script will run a single unit test and display the following
output:

```js
The getJoke() function
    ✓ should return a joke

  1 passing (5ms)
```

### Phase 1C: Removing a dependency

The project contains three development dependencies: `mocha`, `chai`, and
`chai-spies`. `mocha` and `chai` are both being used to unit test the project,
but `chai-spies` is not currently being used. Go ahead and use npm to remove the
`chai-spies` from the project.

After removing the `chai-spies` package, you can open the `package.json` file to
confirm that the project's dependencies were correctly updated.

## Phase 2: Using npm to update a dependency

This project was created a bit ago, so it'd be a good idea to ensure that the
project is using the latest minor and patch versions of each of its
dependencies. Go ahead and use npm to update any all of its dependencies.

After updating the project, be sure to run the `start` and `test` scripts again
to check that everything still works as expected.

## What we've learned

In this project, you

* cloned an existing project from a GitHub repository;
* used npm to install the project's dependencies;
* ran each of the project's npm scripts;
* used npm to remove a dependency;
* and used npm to update a dependency.

[repo to clone]: https://github.com/appacademy-starters/javascript-using-npm-with-an-existing-project
