const request = require('supertest')
const db = require('../data/dbConfig.js');
const Games = require('../games/gamesModel.js')

const server = require('./server.js');

describe('server.js', () => {
    it('should set environment to be testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('POST /', () => {
        afterEach(async () => {
            await db('games').truncate();
        })
        
        it('should return 422 when body is incomplete', async () => {
            const newGame = {
                name: 'testGame',
                madeIn: '2000'
            }
            const response = await request(server)
            .post('/games')
            .send(newGame);
            
            expect(response.status).toBe(422);
        });
        
        it('should return 201 when successful', async () => {
            const newGame = {
                title: 'Fortnite',
                genre: 'Shooter',
                releaseYear: 2017
            }
            
            const response = await request(server)
            .post('/games')
            .send(newGame)
            
            expect(response.status).toBe(201);
        });
        
        
        it('should return the id and added game when successful', async () => {
            const newGame = {
                title: 'Fortnite',
                genre: 'Shooter',
                releaseYear: 2017
            }
            
            const response = await request(server)
            .post('/games')
            .send(newGame)
            
            expect(response.body).toEqual({...newGame, id: 1});
            
        });
        
    });
    
    describe('GET / ', () => {
        afterEach(async () => {
            await db('games').truncate();
        })

        it('should return 200 status code when successful', async () => {
            const response = await request(server).get('/games')
            expect(response.status).toBe(200);
        });

        it('should return array of all games in the db', async  () => {
            const newGame1 = {
                title: 'game1',
                genre: 'shooter',
                releaseYear: 2017
            }

            const newGame2 = {
                title: 'game2',
                genre: 'adventure',
                releaseYear: 2000
            }

            // add games to the db first
            await Games.insert([newGame1, newGame2]);
            // get all the games using getAll()
            const allGames = await Games.getAll();
            // expect 2 games to be in the db
            expect(allGames.length).toBe(2);
        });

        it('should return empty array if no game in the db', async () => {
            const response = await request(server).get('/games')
            expect(response.body).toEqual([]);
        });
    });
});