module.exports = {
    name: 'goku?',
    args: false,
    usage: 'Does not take parameters',
    description: 'Making sure Goku is alive',
    guildOnly: false,
    cooldown: 5,
    aliases: ['test'],
    execute(message) {
        message.reply('Hi!');
    },
};
