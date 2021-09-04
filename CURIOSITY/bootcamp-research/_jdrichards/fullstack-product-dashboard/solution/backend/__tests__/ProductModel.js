const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers');

const Model = require('../db/models/product');

describe('The Product Model', () => {
  const Product = Model(sequelize, dataTypes);
  const instance = new Product();

  checkModelName(Product)('Product');

  describe('has these properties', () => {
    ['image', 'name', 'price'].forEach(checkPropertyExists(instance));
  });
});
