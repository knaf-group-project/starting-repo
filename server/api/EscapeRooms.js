const express = require('express');
const { useParams } = require('react-router-dom');
const EscapeRoomsRouter = express.Router();


const { getRooms } = require('../db')

EscapeRoomsRouter.get('/', async (req, res, next) => {
    try {
        res.send(await getRooms());
    } catch (error) {
        next(error);
    }
})
EscapeRoomsRouter.post('/:roomId', async (req, res, next) => {
    const id = useParams().id
    
} )
module.exports = EscapeRoomsRouter;