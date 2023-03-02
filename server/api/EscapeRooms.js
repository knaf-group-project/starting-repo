const express = require('express');
const EscapeRoomsRouter = express.Router();


const { getRooms } = require('../db')

EscapeRoomsRouter.get('/', async (req, res, next) => {
    try {
        res.send(await getRooms());
    } catch (error) {
        next(error);
    }
})

module.exports = EscapeRoomsRouter;