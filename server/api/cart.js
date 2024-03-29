const express = require('express');

const { 
  getCartByBuyerId, 
  getUserByToken, 
  addProductsToCart, 
  deleteRoomFromCart, 
  purchaseCart 
} = require('../db');

const cartRouter = express.Router();
 
cartRouter.get('/', async (req, res, next) => {
    try {
        res.send(await getCart());
    } catch (error) {
        next(error);
    }
})

//ROUTER: /api/cart/:buyerId
cartRouter.get('/:buyerId', async (req, res, next) => {
  try {
    const { buyerId } = req.params;
    console.log("id:", buyerId)
    const cart = await getCartByBuyerId({ buyerId });
    res.send(cart)
  }
  catch(ex){
    next(ex);
  }
});

//purchase route
cartRouter.post('/', async (req, res) => {
  const user = await getUserByToken(req.headers.authorization);
  const cart = await getCartByBuyerId({ buyerId: user.id });
  const newCart = await purchaseCart({ cartId: cart.id, buyerId: user.id });
  res.send(newCart);
});

cartRouter.post('/:EscapeRoomsId', async (req, res) => {
    const { EscapeRoomsId } = req.params;
    const user = await getUserByToken(req.headers.authorization);
    if (!user) {
        res.status(401).send({ error: 'Unauthorized' });
        return;
    }
    const cart = await getCartByBuyerId({ buyerId: user.id });
    await addProductsToCart({ cartId: cart.id, EscapeRoomsId });
    const updatedCart = await getCartByBuyerId({ buyerId: user.id });
    res.send(updatedCart)
});

cartRouter.delete('/:EscapeRoomsId', async (req, res) => {
  const { EscapeRoomsId } = req.params;
  const user = await getUserByToken(req.headers.authorization);
  if (!user) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  }
  const cart = await getCartByBuyerId({ buyerId: user.id });
  await deleteRoomFromCart({ cartId: cart.id, EscapeRoomsId });
  const updatedCart = await getCartByBuyerId({ buyerId: user.id });
  res.send(updatedCart);
});

module.exports = cartRouter;
