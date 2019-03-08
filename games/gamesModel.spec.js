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
});