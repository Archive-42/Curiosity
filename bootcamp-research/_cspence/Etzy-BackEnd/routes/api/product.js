const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {
  Product,
  Review,
  Purchase,
  Shop } = require('../../db/models');
const { asyncHandler, handleValidationErrors } = require('../../utils');

const productValidators = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please enter the name of your product')
    .isLength({ max: 255 })
    .withMessage('Product name may not be longer than 255 characters'),
  check('price')
    .exists({ checkFalsey: true })
    .withMessage('Please enter a price for your product')
    .isNumeric()
    .withMessage('The price must be a number'),
  check('images')
    .exists({ checkFalsy: true })
    .withMessage('Please link at least one photo of your product'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a description of your product'),
  check('inventory')
    .exists({ checkFalsey: true })
    .withMessage('Please tell us how much of this product you have')
    .isInt()
    .withMessage('Your inventory amount must be a valid whole number'),
];

// get all products
router.get(
  '/',
  asyncHandler(async (req, res) => {
    let products = await Product.findAll();
    let productId = products.map(product => product.id);
    for (let i = 0; i < productId.length; i++) {
      productId[ i ] = await Purchase.findAll({
        where: {
          productId: productId[ i ]
        },
        include: Review
      });
    }
    products = products.map((product, i) => {
      reviews = productId[ i ];
      return { product, reviews };
    });
    res.json(products);
  })
);

// get 16 newest products
router.get(
  '/newest',
  asyncHandler(async (req, res) => {
    let products = await Product.findAll({
      order: [ [ "createdAt", "DESC" ] ],
      limit: 16
    });
    let productId = products.map(product => product.id);
    for (let i = 0; i < productId.length; i++) {
      productId[ i ] = await Purchase.findAll({
        where: {
          productId: productId[ i ]
        },
        include: Review
      });
    }
    products = products.map((product, i) => {
      reviews = productId[ i ];
      return { product, reviews };
    });
    res.json(products);
  })
);

// get product by id
router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    let product = await Product.findByPk(req.params.id, {
      include: Shop
    });
    let productReviews = await Purchase.findAll({
      where: {
        productId: req.params.id
      },
      include: Review
    });
    res.json({ product, productReviews });
  })
);

// create a new product
router.post(
  '/',
  productValidators,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const {
      name,
      price,
      images,
      description,
      options,
      inventory,
      shopId
    } = req.body;
    const newProduct = await Product.create({
      name,
      price,
      images,
      description,
      options,
      inventory,
      shopId
    });
    res.json(newProduct);
  })
);

// update a product
router.put(
  '/:id(\\d+)',
  productValidators,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    const {
      name,
      price,
      images,
      description,
      options,
      inventory,
      shopId
    } = req.body;
    const updatedProduct = await product.update({
      name,
      price,
      images,
      description,
      options,
      inventory,
      shopId
    });
    res.json(updatedProduct);
  })
);

// delete a product
router.delete(
  '/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.end();
    } else {
      const err = new Error('Product not found');
      err.title = '404 Product Not Found';
      err.status = 404;
      next(err);
    }
  })
);

module.exports = router;