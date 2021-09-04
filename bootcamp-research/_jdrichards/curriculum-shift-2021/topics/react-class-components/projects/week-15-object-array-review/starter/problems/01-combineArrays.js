/*
Write a function, `combineArrays()`, that can accept any number of
arrays. Return a new array, where all of the arrays passed to your
function have their elements added to the new array.

Examples:
const numArray = [1, 2, 3, 4, 5];
const stringArray = ['hello', 'world', 'jello', 'squirrel'];
const objectsArray = [{ item: 'Chicken' }, { movie: 'Avengers' } ]


const newArray = combineArrays(numArray, stringArray, objectsArray);
console.log(newArray) // [
    1, 2, 3, 4, 5,
    'hello', 'world', 'jello', 'squirrel',
    { item: 'Chicken' }, { movie: 'Avengers' }
]

NOTE:
If the element is an object, the reference to that object SHOULD be copied.

// HINT: Lookup the spread and rest operator on MDN.


***********************************************************************/

const combineArrays = () => {
    // your code here
}

/**************DO NOT MODIFY ANYTHING UNDER THIS  LINE*****************/
try{
    module.exports = combineArrays;
} catch(e) {
    module.exports = null;
}