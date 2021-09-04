// iterators - loops through strings, arrays, objects, node lists, arguments, type arrays, maps, sets, user defined iterables
// const companies = ['Microsoft', 'Google', 'Yahoo', 'Apple'];

// const iterator = companies[Symbol.iterator]();

// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());

// for (let company of companies) {
//     console.log(company);
// }

// const person = {
//     name: "Michael",
//     phone: "867-5309"
// };

// person[Symbol.iterator] = function* () {
//     yield* Object.keys(this);
//     yield* Object.values(this);
// };

// const l = [...person];
// console.log(`l: `, l);

// for (let b of person) {
//     console.log(b);
// }

// person[Symbol.iterator] = () => {
//     let calls = 0;
//     return {
//         next: () => {
//             const stop = calls >= Object.keys(person).length;
//             calls++;
//             if (!stop) {
//                 return {
//                     value: Object.keys(person)[calls - 1],
//                     done: false
//                 };
//             }
//             return {
//                 done: true,
//             };
//         }
//     };
// };
// const iterator = person[Symbol.iterator]();
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());



// generators
function* generateThings() {
    yield 'Hello World';
    yield 'Hi';
    yield 'Test';
    return 'return';
}

const g = generateThings();
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());




// generator that iterates through objects
