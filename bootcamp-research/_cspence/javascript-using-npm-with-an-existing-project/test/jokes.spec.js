
const chai = require('chai');
const expect = chai.expect;

const getJoke = require('../jokes');

describe('The getJoke() function', () => {
  it('should return a joke', () => {
    const joke = getJoke();
    expect(joke).to.not.be.null;
    expect(joke).to.not.be.empty;
  });
});
