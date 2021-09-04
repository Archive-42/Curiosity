const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const { Product } = db;

const productNotFoundError = (id) => {
  const err = Error('Product not found');
  err.errors = [`Product with id of ${id} could not be found.`];
  err.title = 'Product not found.';
  err.status = 404;
  return err;
};

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);
  const errors = validationErrors.array().map((error) => {
    error.msg;
  });
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => error.msg);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    return next(err);
  }
  next();
};

const validateProduct = [
  check('image')
    .notEmpty()
    .isURL({ require_protocol: false, require_host: false }),
  check('name').not().isEmpty(),
  check('price').isInt(),
  handleValidationErrors
];

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.findAll();
    return res.json({ products });
  })
);

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      return res.json({ product });
    } else {
      next(productNotFoundError(req.params.id));
    }
  })
);

router.post(
  '/',
  validateProduct,
  asyncHandler(async (req, res) => {
    const { image, name, price } = req.body;
    const product = await Product.create({ image, name, price });
    return res.json({ product });
  })
);

router.put(
  '/:id(\\d+)',
  validateProduct,
  asyncHandler(async (req, res, next) => {
    const product = await Product.findByPk(req.params.id);

    if (product) {
      product.image = req.body.image || product.image;
      product.name = req.body.name || product.name;
      product.price = req.body.price || product.price;

      await product.save();
      res.json({ product });
    } else {
      next(productNotFoundError(req.params.id));
    }
  })
);

router.delete('/:id(\\d+)', async (req, res, next) => {
  const product = await Product.findByPk(req.params.id);
  if (product) {
    await product.destroy();
    res.status(204).end();
  } else {
    next(productNotFoundError(req.params.id));
  }
});
module.exports = router;
