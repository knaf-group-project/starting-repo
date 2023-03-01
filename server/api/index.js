const express = require('express');
const router = express.Router();

// ROUTER: /api/User
const usersRouter = require('./users');
router.use('/users', usersRouter);

// ROUTER: /api/EscapeRooms
const EscapeRoomsRouter = require('./EscapeRooms');
router.use('/EscapeRooms', EscapeRoomsRouter);

// ROUTER: /api/cart
const cartRouter = require('../db/cart');
router.use('/cart', cartRouter);

// ROUTER: /api/cart_products
const cartProductsRouter = require('../db/cart_products');
// const { getUserById } = require('../db');
router.use('/cart_products', cartProductsRouter);

router.use((error, req, res, next) => {
    if (error.name == "UnauthorizedUserError") {
        res.status(403);
    }
    res.send({
      name: error.name,
      message: error.message
    });
  });

module.exports = router;