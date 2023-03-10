require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

const morgan = require('morgan');
app.use(morgan('dev'));

const cors = require('cors')
app.use(cors());

app.use(express.json());

// ROUTER: /api
const apiRouter = require('./api');
app.use('/api', apiRouter);

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../static/index.html')));

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
});

module.exports = app;