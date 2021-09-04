const assert = require('assert');
const { string } = require('yargs');
const combineArrays = require('../problems/01-combineArrays');

describe('combineArrays()', function() {
    const numArray = [1, 2, 3, 4, 5];
    const stringArray = ['hello', 'world', 'jello', 'squirrel'];
    const objectsArray = [{ item: 'Chicken' }, { movie: 'Avengers' } ]

    it('Should return a new array', function(){
        const returnValue = combineArrays(numArray, stringArray, objectsArray);
        assert.ok(numArray !== returnValue);
        assert.ok(stringArray !== returnValue);
        assert.ok(objectsArray !== returnValue);
    });

    it('Should NOT return a two dimensional array.', function(){
        const newArray = combineArrays(numArray, objectsArray);
        newArray.forEach(el => {
            assert.ok(Array.isArray(el) === false)
        });
    });

    it('Should return a new array containing EVERY element of the arrays given to it.', function(){
        const newArray2 = combineArrays(numArray, stringArray)

        numArray.forEach(el => {
            assert.ok(newArray2.includes(el));
        });

        stringArray.forEach(el => {
            assert.ok(newArray2.includes(el))
        });

    });

    it('Should copy the reference of any object inside any given array.', function(){
        const newArray3 = combineArrays(stringArray, objectsArray);
        objectsArray.forEach(el => {
            assert.ok(newArray3.includes(el))
        });
    });


});
