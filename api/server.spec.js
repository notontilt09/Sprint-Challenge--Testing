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
        it('should return 200 status code when successful', () => {
            
        });

        it('should return array of all games in the db', () => {
            
        });

        it('should return empty array if no game in the db', () => {
            
        });
    });
});