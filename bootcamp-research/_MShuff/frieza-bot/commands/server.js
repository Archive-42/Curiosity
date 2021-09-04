module.exports = {
    name: 'server',
    description: 'Displays server information.',
    cooldown: 5,
    execute(message) {
        message.channel.send(`**Server ID**: ${message.guild.id}\n**Server Name:** ${message.guild.name}\n**Server Members:** ${message.guild.memberCount}\n**Created:** ${message.guild.createdAt}\n**Region:** ${message.guild.region}`);
    },
};
