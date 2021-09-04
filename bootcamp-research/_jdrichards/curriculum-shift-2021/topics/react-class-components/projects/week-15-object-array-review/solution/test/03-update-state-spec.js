const assert = require('assert');
const updateState = require('../problems/03-updateState');

describe('updateState()', function() {
    const state = {
        userPosts: [
            { message: 'When is Elden Ring coming out???', userName: 'cool_guy25'},
            { message: 'I think I will watch the matrix movies again...', userName: 'cool_guy25'},
        ],

        currentUser: { userName: 'cool_guy25', userId: 4, email: 'coolGuy25@email.com'}
    }

    const newPost = {
        message: 'Has anyone seen The Lord of the Star wars? Is it good?', userName: 'cool_guy25'
    };

    it('Should return a new object', function() {
        assert.ok(state !== updateState(state, newPost))
    });

    it('Should add the new post to the userPosts array.', function() {
        assert.ok(updateState(state, newPost).userPosts.length === 3)
    });

    it(`Should NOT copy the reference of userPosts`, function () {
        const newState = updateState(state, newPost)
        assert.ok(newState.userPosts !== state.userPosts);
    });

    it(`Should NOT copy the reference of currentUser`, function () {
        const newState = updateState(state, newPost)
        assert.ok(newState.currentUser !== state.currentUser);
    });

});