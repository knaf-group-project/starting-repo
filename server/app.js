
const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
app.use(morgan('dev'));

const cors = require('cors')
app.use(cors());

app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../static/index.html')));

app.use('/api/EscapeRooms', require('./api/EscapeRooms'));


// // ROUTER: /api
// const apiRouter = require('./api');
// app.use('/api', apiRouter);




app.use('/api/auth', require('./api/auth'));

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
});

module.exports = app;
