/*
Write a function, `addRemoveKey(obj, remove, add)`, that takes in an object,
(obj), a key to be removed, (remove) and a key to be added, (add). You must
mutate your original object such that the key you add, has the value of
the key you must remove.

Examples:

const obj = { chese: 'Swiss' };
const newObj = addRemoveKey(obj, 'chese', 'cheese');
console.log(newObj) // { cheese: 'Swiss' };

const obj2 = { cateNam: 'Finn' };
const newObj2 = addRemoveKey(obj2, 'cateNam', 'catName');
console.log(newObj2) // { catName: 'Finn' };

// HINT: Lookup "delete" on MDN.


***********************************************************************/

const addRemoveKey = (obj, remove, add) => {
    const originalValue = obj[remove];

    delete obj[remove];
    obj[add] = originalValue;

    return obj;
}

/**************DO NOT MODIFY ANYTHING UNDER THIS  LINE*****************/
try{
    module.exports = addRemoveKey;
} catch(e) {
    module.exports = null;
}