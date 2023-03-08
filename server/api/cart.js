const express = require('express');
const cartRouter = express.Router();

cartRouter.get('/', async (req, res, next) => {
    try {
        res.send(await getCart());
    } catch (error) {
        next(error);
    }
})

module.exports = cartRouter;