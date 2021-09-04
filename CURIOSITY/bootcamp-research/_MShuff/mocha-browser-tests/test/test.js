import MyClass from '../myClass.js';
import sumNumbers from '../sum.js';

let assert = chai.assert;
let expect = chai.expect;

describe('MyClass tests', () => {
  context('The class', () => {
    it('Can be instantiated', () => {
      assert.isObject(new MyClass());
      expect(new MyClass()).to.be.an.instanceOf(Object);
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('Sum tests', () => {
  context('Invalid Arguments', () => {
    it('Should throw an error if given 0 arguments', () => {
      expect(() => sumNumbers()).to.throw(TypeError);
    });
  });

  context('Valid Arguments', () => {
    it('If only one number, return number', () => {
      expect(sumNumbers(10)).to.equal(10);
    });

    it('Should sum numbers correctly', () => {
      expect(sumNumbers(10, 20, 30, 40, 50)).to.equal(150);
      expect(sumNumbers(10, 20, 30, 40)).to.equal(100);
    });
  });
});

mocha.setup('bdd');
