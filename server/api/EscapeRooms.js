const express = require('express');
const EscapeRoomsRouter = express.Router();

const { createEscapeRooms } = require('../db/EscapeRooms')

EscapeRoomsRouter.get('/EscapeRooms', async (req, res, next) => {
    try {
        const EscapeRooms = await createEscapeRooms()
        res.send(EscapeRooms);
    } catch (error) {
        next(error);
    }
})

module.exports = router;