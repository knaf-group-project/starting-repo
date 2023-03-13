const express = require('express');
const router = express.Router();
const { getUserByToken } = require('../db/User');
const { getCartByBuyerId } = require('../db/cart');

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

// Router: /api/EscapeRooms/:id
router.get('/EscapeRooms/:id', async (req, res, next) => {
  const { id } = req.params;
  const escapeRoom = await getEscapeRoomsById({ id });
  res.send(escapeRoom)
});

//ROUTER: /api/cart
const cartRouter = require('./cart');
router.use('/cart', cartRouter);

//ROUTER: /api/cart/:buyerId
router.get('/cart/:buyerId', async (req, res, next) => {
  const { buyerId } = req.params;
  console.log("id:" , buyerId)
  const cart = await getCartByBuyerId({ buyerId });
  res.send(cart)
});

router.post('/cart/:EscapeRoomsId', async (req, res) => {
  const {EscapeRoomsId } = req.params;
  const user = await getUserByToken(req.headers.authorization);
  if(!user){
    res.status(401).send({ error: 'Unauthorized' });
    return;
  } 
  const cart = await getCartByBuyerId({usersId: user.id});
  await addEscapeRoomToCart({cartId: cart.id, EscapeRoomsId});
  const updatedCart = await getCartByBuyerId({usersId: user.id});
  res.send(updatedCart)  
});

// ROUTER: /api/cart_products
// const cartProductsRouter = require('./cart_products');
// router.use('/cart_products', cartProductsRouter);

router.use((error, req, res, next) => {
  if (error.name == "UnauthorizedUserError") {
    res.status(403);
  }
  res.status(500).send({
    name: error.name,
    message: error.message
  });
});

module.exports = router;
