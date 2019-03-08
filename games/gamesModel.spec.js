const db = require('../data/dbConfig.js');
const Games = require('../games/gamesModel.js');

describe('games model', () => {
    describe('insert()', () => {
        afterEach(async () => {
            await db('games').truncate();
        })
        
        it('should insert provided game to the db', async () => {
            const newGame = {
                title: 'Fortnite',
                genre: 'Shooter',
                releaseYear: '2017'
            }
            const game = await Games.insert(newGame);
            expect(game.title).toBe('Fortnite');
        });
    });
    
    describe('getAll()', () => {
        afterEach(async () => {
            await db('games').truncate();
        })
        
        it('should return all games from db', async () => {
            // add game to the empty db so we can see what is returned
            const newGame = {
                title: 'Fortnite',
                genre: 'Shooter',
                releaseYear: 2017
            }
            await Games.insert(newGame);

            // get all games using Games.getAll()
            const gamesFound =  await Games.getAll();
            // expect the result of getAll() to be an array containing the game we just added
            expect(gamesFound).toEqual([{...newGame, id: 1}]);
        });
        
    });
});