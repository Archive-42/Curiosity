module.exports = {
    name: 'user-info',
    description: 'Returns relevant user information',
    cooldown: 5,
    execute(message) {
        message.channel.send(`**Your Username:** ${message.author.username}\n**Your ID:** ${message.author.id}`);
    },
};
