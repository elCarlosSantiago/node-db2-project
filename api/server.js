const express = require('express');
const helmet = require('helmet');

const carsRouter = require('./cars/cars-router');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/cars', carsRouter);

server.use('*', (req, res) => {
  res.status(404).json('Resource not found :(.')
})

module.exports = server;
