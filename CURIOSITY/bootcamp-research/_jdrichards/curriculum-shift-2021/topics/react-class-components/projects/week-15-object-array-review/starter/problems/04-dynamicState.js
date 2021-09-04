/*
write a function, `dynamicState(state, action, data)` that accepts an object,
(state), and TWO optional paremeters, action (string) and data (could be string or object).
Like the last question, you should deeply duplicate your state before any modifications
are to be done. You may assume you will only ever be given a state that has a shape
like this, { session: { userName: 'BestDoggo22', rating: 1000 } };

After your state has been duplicated, you must modify that new state according to your
action, and data parameter. The possibilities go as follows.

PART 1: If your action variable has a value of 'logout', simply return an object
where there is only one key, 'session', and it's value is null.'

PART 2: If your action variable is undefined, return state, uncopied, unchanged
simply return it the way it came in.

HINT:

For steps 1-2, try to test them yourself. It's important that you develop good
debugging practices to find out if our behavior is what we expect, or want.
Try using a console.log, or look at the test cases. Good luck!


PART 3: If your action variable is equal to 'delete', use the value of the
`data` parameter as the key that should be removed from the new state,
and finally return that newState object. You should assume data will be a string
for this step.

Example for PART 3:
const state = { session: { userName: 'BestDoggo22', rating: -10 } };
const newState =  dynamicState(state, 'delete', 'rating');
console.log(newState) // { session: { userName: 'BestDoggo22' }};


PART 4: If your action variable is equal to 'replace', treat the `data` parameter
as an object, where it has one key, and one value. You should change your copied
state such that the data's key and value are copied and set as a key-value pair
0n the new state.

Example for PART 4:
const state2 = { session: { userName: 'BestDoggo22', rating: -10 } };
const newState2 =  dynamicState(state2, 'replace' { rating: 1000 });
console.log(newState2) // { session: { userName: 'BestDoggo22', rating: 1000 } };


PART 5: If your action variable is equal to 'add', make a new key value pairing in
your copied new state. Treat the `data` paremeter as an object where its key and value
should be added to your new state's session value.

Example for PART 5:
const state3 = { session: { userName: 'foodBro8000' } }
const newState3 = dynamicState(state3, 'add', { favorites: ['fajitas', 'ramen', 'fried chicken'] });
console.log(newState3) // { session: { userName: 'foodBro8000', favorites: ['fajitas', 'ramen', 'fried chicken'] } } }


**BONUS**:
Try to solve this function with a switch case statement, not sure what that is?
Check out the docs on MDN via the link below!

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch

***********************************************************************/

const dynamicState = () => {
    // your code here
};

/**************DO NOT MODIFY ANYTHING UNDER THIS  LINE*****************/
try{
    module.exports = dynamicState;
} catch(e) {
    module.exports = null;
}
