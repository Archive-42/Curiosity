const chai = require('chai');
const expect = chai.expect;
const { isFive, isOdd, myRange, fizzBuzz } = require('../problems/problems.js');
describe('isFive(num)', () => {
  it('should return true if the num is 5 otherwise false', () => {
    //Arrange
    const num1 = 5;
    //Act
    const actual1 = isFive(num1); // should be true
    const expectedAnswer1 = true; // since we know that 5 == 5 we expect true
    //Assert
    expect(actual1).to.equal(expectedAnswer1); // Although we can write this. it is more readable with a refactor
    expect(actual1).to.be.true;
    //lets test more
    //Arrange
    const otherInput = 'not 5';
    const num2 = 4;
    //Act
    const actual2 = isFive(num2); // should be false
    const expectedAnswer2 = false; // since we know that 4 !== 5 we expect true
    const actual3 = isFive(otherInput); // should be false
    const expectedAnswer3 = false; // since we know that 'not 5' !== 5 we expect true
    //Assert
    expect(actual2).to.equal(expectedAnswer2);
    expect(actual2).to.be.false;

    expect(actual3).to.equal(expectedAnswer3);
    expect(actual3).to.be.false;
  });
});
describe('isOdd(number)', () => {
  it('should return true if number is odd', () => {
    //Arrange
    const num1 = 3;
    const num2 = 2953;
    const num3 = -999;
    //Act
    const actual1 = isOdd(num1); // should be true
    const actual2 = isOdd(num2); // should be true
    const actual3 = isOdd(num3); // should be true
    //Assert
    expect(actual1).to.be.true; // <--- to.be.true;
    expect(actual2).to.be.true;
    expect(actual3).to.be.true;
  });
  it('should return false if the num is even', () => {
    //Arrange
    const num1 = 4;
    const num2 = 2952;
    const num3 = -998;
    //Act
    const actual1 = isOdd(num1); // should be false
    const actual2 = isOdd(num2); // should be false
    const actual3 = isOdd(num3); // should be false
    //Assert
    expect(actual1).to.be.false;
    expect(actual2).to.be.false;
    expect(actual3).to.be.false;
  });
  it('should throw an error if num is not type of Number', () => {
    //Arrange
    const string = 'i am a string';
    const object = { i: 'am', an: 'object' };
    const array = ['i', 'am', 'an', 'array'];
    //Act
    //isOdd('string') <-- DON'T DO THIS error will not be handled
    //if we  wrote this like so. when the code gets to line 85, it will thow an
    //error. and the code stop executing. But that's what we want the function
    //to do. So lets pass it in as a call back instead
    const callback1 = () => isOdd(string);
    expect(callback1).to.throw(Error);
    expect(callback1).to.throw(Error);
  });
});
describe('myRange(min, max, step)', () => {
  context('if step is not provided', () => {
    it('should return the correct array with default value step=1', () => {
      //Arrange
      const [min1, max1] = [0, 5];
      const [min2, max2] = [6, 3];
      //Act
      const actual1 = myRange(min1, max1);
      const expected1 = [0, 1, 2, 3, 4, 5];
      const actual2 = myRange(min2, max2);
      const expected2 = [];
      // Assert
      expect(actual1).to.eql(expected1); // same as deep.equal
      expect(actual2).to.eql(expected2);
    });
  });
  context('if step is provided', () => {
    it('should return the correct array', () => {
      //Arrange
      const [min1, max1, step1] = [0, 5, 1];
      const [min2, max2, step2] = [0, 5, 2];
      const [min3, max3, step3] = [9, 5, 2];
      //Act
      const actual1 = myRange(min1, max1, step1);
      const expected1 = [0, 1, 2, 3, 4, 5];
      const actual2 = myRange(min2, max2, step2);
      const expected2 = [0, 2, 4];
      const actual3 = myRange(min3, max3, step3);
      const expected3 = [];
      // Assert
      expect(actual1).to.eql(expected1);
      expect(actual2).to.eql(expected2);
      expect(actual3).to.eql(expected3);
    });
  });
  it('should throw an error if num is not type of Number', () => {
    //Arrange
    const string = 'i am a string';
    const object = { i: 'am', an: 'object' };
    const array = ['i', 'am', 'an', 'array'];
    //Act
    //isOdd('string') <-- DON'T DO THIS error will not be handled
    //if we  wrote this like so. when the code gets to line 85, it will thow an
    //error. and the code stop executing. But that's what we want the function
    //to do. So lets pass it in as a call back instead
    const callback1 = () => isOdd(string);
    const callback2 = () => isOdd(object);
    const callback3 = () => isOdd(array);
    expect(callback1).to.throw(Error);
    expect(callback2).to.throw(Error);
    expect(callback3).to.throw(Error);
  });
});
describe('fizzBuzz(max)', () => {
  it('should throw a RangeError if max < 0', () => {
    //Arrange
    const max = -5;
    //Act
    const callback = () => fizzBuzz(max);
    expect(callback).to.throw(Error);
  });
  it('should throw a TypeError if max is not a number', () => {
    //Arrange
    const max1 = 'rando-string';
    const max2 = ['rando', 'array'];
    class RandomClassThatIsNotANumber {} //just a barebones class
    const max3 = new RandomClassThatIsNotANumber();
    //Act
    const callback1 = () => fizzBuzz(max1);
    const callback2 = () => fizzBuzz(max2);
    const callback3 = () => fizzBuzz(max3);
    expect(callback1).to.throw(TypeError);
    expect(callback2).to.throw(TypeError);
    expect(callback3).to.throw(TypeError);
  });
  it('should return an array from 0 to max (not inclusive) of numbers that are divisible by either 3 or 5 but not both', () => {
    //Arrange
    const max1 = 0;
    const max2 = 20;
    //Act
    const actual1 = fizzBuzz(max1);
    const actual2 = fizzBuzz(max2);
    const expected1 = [];
    const expected2 = [3, 5, 6, 9, 10, 12, 18];
    //Assert
    expect(actual1).to.eql(expected1);
    expect(actual2).to.eql(expected2);
  });
});
