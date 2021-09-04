module.exports = {
    name: 'ping',
    description: 'Ping!',
    cooldown: 5,
    execute(message) {
        message.channel.send(`Who's kitty litter did I just shit in...?`);
    },
};
