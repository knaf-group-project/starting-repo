const express = require('express');
const router = express.Router();

// Router: /api/auth
router.use('/auth', require('./auth'));

// ROUTER: /api/User
const usersRouter = require('./users');
router.use('/users', usersRouter);

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
