const router = require('express').Router();
const userRouter = require('./api/user');
const shopRouter = require('./api/shop');
const productRouter = require('./api/product');
const reviewsRouter = require('./api/review');
const favoriteRouter = require('./api/favorite');
const orderRouter = require('./api/order');
const followRouter = require('./api/follow');

router.use('/users', userRouter);
router.use('/shops', shopRouter);
router.use('/products', productRouter);
router.use('/reviews', reviewsRouter);
router.use('/favorites', favoriteRouter);
router.use('/orders', orderRouter);
router.use('/follows', followRouter);

module.exports = router;
