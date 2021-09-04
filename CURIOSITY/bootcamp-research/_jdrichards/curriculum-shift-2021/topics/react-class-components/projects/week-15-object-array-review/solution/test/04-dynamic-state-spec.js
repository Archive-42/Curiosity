const assert = require('assert');
const dynamicState = require('../problems/04-dynamicState');

describe('dynamicState()', function() {
    const testDelete = { session: { userName: 'BestDoggo22', rating: -10 } };
    const testReplace = { session: { userName: 'worstCatto' } };
    const testUnchanged =  { session: { userName: 'cutiePatootie' } };
    const testLogout = { session: { userName: 'cutiePatootie' } };
    const testAdd = { session: { userName: 'IlovePuppies',  } }

    it('Should return a new state where the session key is set to null', function(){
        assert.ok(dynamicState(testLogout, 'logout').session === null)
    });

    it(`Should return the original state, unchanged if the action variable is undefined.`, function () {
        assert.ok(testUnchanged === dynamicState(testUnchanged))
    });


    it(`Should delete a key/value pair if the action variable is 'delete'`, function(){
        assert.ok(dynamicState(testDelete, 'delete', 'rating').session.rating === undefined)
    });

    it(`Should replace the value of key if the action variable is 'replace'.`, function() {
        assert.ok(testReplace.session.rating !== dynamicState(testReplace, 'replace', { rating: 1000 }).session.rating);
    });

    it(`Should add a new key/value pair if the action variable is 'add'`, function() {
        assert.ok('blue' === dynamicState(testAdd, 'add', { faveColor: 'blue' }).session.faveColor )
    });

    it('Should NEVER mutate the original state.', function() {
        assert.ok(testDelete !== dynamicState(testDelete, 'delete', 'rating'));
        assert.ok(testReplace !== dynamicState(testReplace, 'replace', { rating: 1000 }));
        assert.ok(testLogout !== dynamicState(testLogout, 'logout'));
        assert.ok(testUnchanged === dynamicState(testUnchanged));
    });

    it(`Should NOT copy the references of the original state.`, function () {
        assert.ok(testDelete.session !== dynamicState(testDelete, 'delete', 'rating'));
        assert.ok(testReplace.session !== dynamicState(testReplace, 'replace', { username: 'bestCatto' }))
    });

});
