const chai = require('chai');
const expect = chai.expect;

const spies = require('chai-spies');
// You need to tell chai to use spies
chai.use(spies); // <--

// Bring in the function or class you're testing
const myMap = require('../problems/hook-problems');

describe('myMap()', () => {
  // declaration first
  let inputArray;

  beforeEach(() => {
    // initialize variable in beforeEach
    inputArray = [1, 2, 3];
  });

  afterEach(() => {
    console.log('After each hook...');
  });

  before(() => console.log('Starting tests for myMap...'));
  after(() => console.log('Done with myMap'));

  it('should return a new array', () => {
    expect(myMap(inputArray, () => {})).to.be.an.instanceOf(Array);
  });

  it('should return a new array with the same elements', () => {
    const expectedArray = [2, 3, 4];
    // expect(myMap(inputArray, (element) => element + 1)).to.equal(expectedArray);
    // equal -> checks memory locations to ensure it's the same thing
    expect(expectedArray).to.equal(expectedArray); // <-- Same location in memory
    // Same tests

    let result = myMap(inputArray, (element) => element + 1);

    expect(result).to.eql(expectedArray);
    // eql is the same as deep.equal and it will check the values inside of the object or the array
    // equal will strictly check memory locations to make sure we're looking at the same thing

    // General Rule
    // If you're comparing arrays or objects, use eql or deep.equal
    // If you're comparing primitive values like strings or numbers, you can use equal
  });

  it('should not modify the input Array', () => {
    // if inputArray changes or is mutated, then unmodified also gets mutated
    myMap(inputArray, (element) => element + 1);
    expect(inputArray).to.deep.equal([1, 2, 3]);
  });

  it('should not call the built in map', () => {
    // chai.spy.on takes 2 arguments
    //   1. Object that has the method on it
    //   2. The method that you want to spy on as a string
    const mapSpy = chai.spy.on(inputArray, 'map');
    const alternateMapSpy = chai.spy.on(Array.prototype, 'map');
    myMap(inputArray, (element) => element + 1);
    expect(mapSpy).to.not.have.been.called();
  });

  it('should call the callback for each element in the input array', () => {
    // We use chai.spy when we're spying on a callback function that's not on a specific object
    const callback = (element) => element + 1;
    // chai.spy(callback) - Creates a new function (callbackSpy) and adds little chai spies to it
    const callbackSpy = chai.spy(callback);
    // You actually have to use the spy for the callback
    myMap(inputArray, callbackSpy);
    expect(callbackSpy).to.have.been.called.exactly(inputArray.length);
  });
});
