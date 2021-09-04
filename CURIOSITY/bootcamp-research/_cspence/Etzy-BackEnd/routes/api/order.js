const express = require('express');
const router = express.Router();
const {
  Order,
  Purchase,
  Review,
  Product,
  Shop,
  User
} = require('../../db/models');
const { asyncHandler } = require('../../utils');

router.get(
  '/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: Purchase,
          include: [
            Review,
            {
              model: Product,
              include: Shop
            }
          ]
        },
        {
          model: User,
          attributes: [ "firstName", "lastName", "avatar", "createdAt" ]
        } ]
    });
    res.json(order);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    let { userId, productIds } = req.body;
    productIds = JSON.parse(productIds);
    if (!productIds.length) res.end();
    const order = await Order.create({ userId });
    let purchases = [];
    for (let productId of productIds) {
      let purchase = await Purchase.create({
        productId,
        orderId: order.id
      });
      purchases.push(purchase);
    }
    res.json({ order, purchases });
  })
);

module.exports = router;