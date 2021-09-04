/*
You work for MyFace, a social media company. They are rebuilding their
"post status" feature. You must write a function, `updateState(state, newPost)`,
that will accept two parameters, `state`, an object, and `newPost`, an object
containing the user post data. Copy your state, add `newPost` to that new state,
and finally return that state. If all goes well your new state should NOT
have been directly mutated, and instead have an entirely new value.

Example:
const state = {
    userPosts: [
        { message: 'When is Elden Ring coming out???', userName: 'cool_guy25'},
        { message: 'I think I will watch the matrix movies again...', userName: 'cool_guy25'},
    ],

    currentUser: { userName: 'cool_guy25', userId: 4, email: 'coolGuy25@email.com'}
}

const newPost = {
    message: 'Has anyone seen The Lord of the Star wars? Is it good?', userName: 'cool_guy25'
}

const newState = updateState(state, newPost);
console.log(newState) // {
    userPosts: [
        { message: 'When is Elden Ring coming out???', userName: 'cool_guy25'},
        { message: 'I think I will watch the matrix movies again...', userName: 'cool_guy25'},
        { message: 'Has anyone seen The Lord of the Star wars? Is it good?', userName: 'cool_guy25' },
    ],

    currentUser: { userName: 'cool_guy25', userId: 4, email: 'coolGuy25@email.com'}
}

console.log(newState !== state); // true
console.log(newState.userPosts !== state.userPosts); // true;
************************************************************************/

const updateState = (state, newPost) => {
    const newState = {};

    newState.userPosts = state.userPosts.map((post) => {
        return {...post};
    })

    newState.userPosts.push(newPost);
    newState.currentUser = {...state.currentUser}

    return newState;
}

/**************DO NOT MODIFY ANYTHING UNDER THIS  LINE*****************/
try{
    module.exports = updateState;
} catch(e) {
    module.exports = null;
}