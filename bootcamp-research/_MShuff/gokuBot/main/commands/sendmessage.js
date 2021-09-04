const { GuildMember } = require('discord.js');

module.exports = {
    name: 'sendmessage',
    description: 'Sends message to desired channel',
    cooldown: 3,
    guildOnly: false,
    aliases: ['message', 'msg'],
    args: true,
    usage: '<channel> <message>',
    execute (msg, args) {
        const { client }  = require('../main.js');
        if (!Array.isArray(args)) {
            args = args.split(' ');
        }
        const msgChan = args.shift();
        const message = args.join(' ');
        let homeChan = client.channels.cache.get("733491269216763969");
        let testChan = client.channels.cache.get("741711523059335168");

        switch(msgChan) {
            case 'home':
            case 'Home':
                homeChan.send(message);
                break;
            case 'test':
            case 'Test':
                testChan.send(message);
                break;
            default:
                homeChan.send(message);
                break;
        }
    },
};
