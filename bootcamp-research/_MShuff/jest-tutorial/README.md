# Testing with Jest

## Table of Contents

1. [Expect](#expect)
   1. [Expect Custom Matchers](#expect-custom-matchers)
1. [Matchers](#matchers)
   1. [Common Matchers](#common-matchers)
   1. [Truthiness](#truthiness)
   1. [Numbers](#numbers)
   1. [Strings](#strings)
   1. [Arrays and Iterables](#arrays-and-iterables)
   1. [Exceptions and Errors](#exceptions-and-errors)

## Expect

`expect(<value>)` - Used every time you want to test a value. Commonly used alongside a **matcher** function to assert something about a value

### Expect Custom Matchers

`expect.extend(<matchers>)` - Used to add your own matchers to Jest.

## Matchers

`not` - Tests for the opposite of any matcher

### Common Matchers

`toBe(<value>)` - Tests exact equality\
`toEqual(<value>)` - Recursively checks every field of an object or array

### Truthiness

`toBeNull()` - Matches only `null`\
`toBeUndefined()` - Matches only `undefined`\
`toBeDefined()` - Opposite of `toBeUndefined()`\
`toBeTruthy()` - Any conditional that returns `true`\
`toBeFalsy()` - Any conditional that returns `false`

### Numbers

`toBe()` and `toEqual()` are equivelant for numbers\
`toBeGreaterThan(<value>)` - Greater than\
`toBeGreaterThanOrEqual(<value>)` - Greater than or equal to\
`toBeLessThan(<value>)` - Less than\
`toBeLessThanOrEqual(<value>)` - Less than or equal to\
`toBeCloseTo(<value>)` - Use this for floating point numbers to avoid tiny rounding errors

### Strings

`toMatch(<value>)` - Used to check strings against regular expressions. Can also pass a string as value

### Arrays and Iterables

`toContain(<value>)` - Checks if an array or other iterable contains the item

### Exceptions and Errors

`toThrow([<value>])` - Tests if a function throws an error or exception. Optionally you can specify the type of error, or a substring inside of the error message.
