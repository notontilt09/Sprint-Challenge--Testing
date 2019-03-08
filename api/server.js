const express = require('express');

const Games = require('../games/gamesModel.js');

const server = express();

server.use(express.json());




module.exports = server;