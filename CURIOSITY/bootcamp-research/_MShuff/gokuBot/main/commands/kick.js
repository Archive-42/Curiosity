module.exports = {
    name: 'kick',
    args: false,
    usage: 'mention1[, mention2, ...] (parameters inside [] are optional) NOT IMPLEMENTED YET!',
    description: 'kick user out of channel/server (not implemented yet)',
    guildOnly: true,
    cooldown: 5,
    aliases: ['boot', 'destroy', 'exile'],
    execute(message) {
        if (!message.mentions.users.size) {
            return message.reply(`You need to tag someone to kick them!`);
        }
        const taggedUser = message.mentions.users.first();
        message.channel.send(`You want to kick ${taggedUser.username}?`);
    },
};
