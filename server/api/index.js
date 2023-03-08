const express = require('express');
const router = express.Router();

// Router: /api/auth
router.use('/auth', require('./auth'));

// ROUTER: /api/User
const usersRouter = require('./users');
router.use('/users', usersRouter);

// ROUTER: /api/Register
// const registerRouter = require('./users/register');
// router.use('/users/register', registerRouter);

// ROUTER: /api/EscapeRooms
const EscapeRoomsRouter = require('./EscapeRooms');
router.use('/EscapeRooms', EscapeRoomsRouter);

//ROUTER: /api/cart
const cartRouter = require('./cart');
router.use('/cart', cartRouter);

//ROUTER: /api/cart/:buyerId
router.get('/cart/:buyerId', async (req, res, res) => {
  const { buyerId } = req.params;
  const cart = await getUserByToken(req.headers.authorization);
if(!user){
res.status(401).send({error: 'Unauthorized'});
return;
}
})

// // ROUTER: /api/cart_products
const cartProductsRouter = require('./cart_products');
const { getUserByToken } = require('../db');
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