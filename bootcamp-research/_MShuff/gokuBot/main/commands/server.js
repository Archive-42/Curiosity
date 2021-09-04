module.exports = {
    name: 'server',
    args: false,
    usage: 'Does not take parameters',
    description: 'Show current server and Member Count',
    guildOnly: true,
    cooldown: 5,
    aliases: ['serv'],
    execute(message) {
        message.channel.send(`Server: ${message.guild.name}\n Members: ${message.guild.memberCount}`);
    },
};
