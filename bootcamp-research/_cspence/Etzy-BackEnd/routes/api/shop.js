const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {
  User,
  Product,
  Shop } = require('../../db/models');
const { asyncHandler, handleValidationErrors } = require('../../utils');

const nameValidator = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please enter a name for your shop.')
    .isLength({ max: 50 })
    .withMessage('Your shop name may not be over 50 characters in length.')
];

// get all shops
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const shops = await Shop.findAll();
    res.json(shops);
  })
);

// find 8 newest shops
router.get(
  '/newest',
  asyncHandler(async (req, res) => {
    const shops = await Shop.findAll({
      order: [ [ "createdAt", "DESC" ] ],
      limit: 8
    });
    res.json(shops);
  })
);

// get shop by id
router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const shop = await Shop.findByPk(req.params.id, {
      include: [
        Product,
        {
          model: User,
          attributes: [ "firstName", "lastName", "avatar", "createdAt" ]
        }
      ]
    });
    res.json(shop);
  })
);

// create a new shop
router.post(
  '/',
  nameValidator,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const {
      name,
      description,
      ownerId
    } = req.body;
    const newShop = await Shop.create({ name, description, ownerId });
    res.json(newShop);
  })
);

// edit a shop
router.put(
  '/:id(\\d+)',
  nameValidator,
  handleValidationErrors,
  asyncHandler(async (req, res, next) => {
    const shop = await Shop.findByPk(req.params.id);
    if (shop) {
      const {
        name,
        description
      } = req.body;
      const updatedShop = await shop.update({ name, description });
      res.json(updatedShop);
    } else {
      const err = new Error('Shop not found');
      err.title = '404 Shop Not Found';
      err.status = 404;
      next(err);
    }
  })
);

// delete a shop
router.delete(
  '/:id(\\d+)',
  asyncHandler(async (req, res, next) => {
    const shop = await Shop.findByPk(req.params.id);
    if (shop) {
      await shop.destroy();
      res.status(200).end();
    } else {
      const err = new Error('Shop not found');
      err.title = '404 Shop Not Found';
      err.status = 404;
      next(err);
    }
  })
);

module.exports = router;