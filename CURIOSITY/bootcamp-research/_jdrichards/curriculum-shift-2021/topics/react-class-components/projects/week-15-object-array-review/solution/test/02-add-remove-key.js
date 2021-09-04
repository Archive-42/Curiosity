const assert = require('assert');
const addRemoveKey = require('../problems/02-addRemoveKey');

describe('addRemoveKey()', function() {
    const obj = { iccrem: 'chocolate chip' };
    const newObj = addRemoveKey(obj, 'iccrem', 'iceCream')

    it('Should NOT return a new object.', function(){
        assert.strictEqual(obj, newObj);
    });

    it('Should remove the original key', function() {
        assert.ok(obj.iccrem === undefined)
    })

    it('Should take the value from the removed key, and set it to the added key.', function(){
        assert.strictEqual(newObj.iceCream, 'chocolate chip');
    });


});