const express = require('express');

const Games = require('../games/gamesModel.js');

const server = express();

server.use(express.json());


server.post('/games', async (req, res) => {
    try {
        const { title, genre, releaseYear } = req.body;
        if (!title || !genre || !releaseYear) {
            res.status(422).json({ message: 'Please provide title, genre, releaseYear' });
        } else {
            const allGames = await Games.getAll();
            const titles = allGames.map(game => {
                return game.title
            })
            if (titles.includes(title)) {
                res.status(405).json({ message: "This title already exists in the db" });
            } else {
                const { id } = await Games.insert(req.body)
                const newGame = await Games.getGame(id);
                res.status(201).json(newGame);
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

server.get('/games', async (req, res) => {
    try {
        const games = await Games.getAll();
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving games' });
    }
});

server.get('/games/:id', async (req, res) => {
    try {
        const game = await Games.getGame(req.params.id)
        if (game) {
            res.status(200).json(game)
        } else {
            res.status(404).json({ message: `A game with id ${req.params.id} was not found` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieve game' });
    }
});



module.exports = server;