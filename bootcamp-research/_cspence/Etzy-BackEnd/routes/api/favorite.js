const express = require('express');
const { asyncHandler } = require('../../utils');
const router = express.Router();
const { Favorite } = require('../../db/models');

// favorite or unfavorite a product or shop
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const {
      userId,
      favProduct,
      shopId,
      productId
    } = req.body;
    if (favProduct) {
      const existingFavorite = await Favorite.findOne({
        where: {
          userId,
          favProduct,
          productId
        }
      });
      if (existingFavorite) {
        await existingFavorite.destroy();
        res.end();
      } else {
        const favorite = await Favorite.create({
          userId,
          favProduct,
          shopId,
          productId
        });
        res.json(favorite);
      }
    } else {
      const existingFavorite = await Favorite.findOne({
        where: {
          userId,
          favProduct,
          shopId
        }
      });
      if (existingFavorite) {
        await existingFavorite.destroy();
        res.end();
      } else {
        const favorite = await Favorite.create({
          userId,
          favProduct,
          shopId,
          productId
        });
        res.json(favorite);
      }
    }
  })
);

module.exports = router;