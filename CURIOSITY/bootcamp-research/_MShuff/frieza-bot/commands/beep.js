module.exports = {
    name: 'beep',
    description: 'Just try it out.',
    cooldown: 5,
    execute(message) {
        message.channel.send('*Scoffs* Eat worms, infidel...');
    },
};
