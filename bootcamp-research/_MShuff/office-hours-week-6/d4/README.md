# Testing Learning Objectives

## Explain the "red-green-refactor" loop of test-driven development

- **Red**:
  - Write the tests and watch them fail (a failing test is red).
  - It's important to ensure the tests initially fail so that you don't have false positives.
- **Green**:
  - Write the minimum amount of code to ensure the tests pass (a passing test will be green).
- **Refactor**:
  - Refactor the code you just wrote. Your job is not over when the tests pass.
  - One of the most important things you do as a software developer is to ensure the code you write is easy to maintain and read.

## Identify the definitions of SyntaxError, ReferenceError, and TypeError

- **SyntaxError**:
  - Thrown when the JavaScript engine attempts to parse code that does not conform to the syntax of the JavaScript language.
  - When learning the JavaScript language this error is a constant companion for any missing } or misspelled function keywords.
  - Many of them can't be caught using try catch blocks.
- **ReferenceError**:
  - Represents an error when a non-existent variable is referenced.
  - This is the error that you'll encounter when attempting to reference a variable that does not exist (either within your current scope or at all).
- **TypeError**:
  - When an operation cannot be performed because the operand is a value of the wrong type.
  - When you are attempting to modify a value that cannot be changed.

## Create, modify, and get to pass a suite of Mocha tests

[Problem Code](./problems/problems.js)
[Test Code](./test/test-spec.js)

## Use Chai to structure your tests using behavior-driven development principles

- The *BDD* styles is `expect` and/or `should`(We have not covered should):
  - Both use the same chainable language to construct assertions, but they differ in the way an assertion is initially constructed.
  - [BDD Chai Documentation](https://www.chaijs.com/api/bdd/)
  
## Use the pre- and post-test hooks provided by Mocha

[Problem Code](./problems/hook-problems.js)
[Test Code](./test/hooks-spec.js)
