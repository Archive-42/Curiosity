module.exports = {
    name: 'beep',
    description: 'Just try it out.',
    cooldown: 5,
    execute(message) {
        message.channel.send('Say the magic words, Fat Gandalf.');
    },
};
