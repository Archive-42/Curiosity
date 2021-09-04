// Importing testing modules and Discord
const assert = require('assert');
const Discord = require('discord.js');
const Bot = require('../main/bot.js');
// Initiate a client to test
const client = new Discord.Client();
// Try and think of edge cases ahead of time
describe('checkToken()', () => {
    it('should throw TypeError if token is not a string', () => {
        assert.throws(() => {
            const test = new Bot(client, 23423);
            test.checkToken();
        }, TypeError, "Token must be a string.");
    })

    it('should return true if the token is a string', () => {
        let test = new Bot(client, 'test');
        test = test.checkToken();
        assert.strictEqual(test, true, "Token must be a string.");
    })
});
