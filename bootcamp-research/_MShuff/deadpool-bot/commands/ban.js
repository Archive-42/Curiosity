module.exports = {
    name: 'ban',
    description: 'Bans a user from the server',
    cooldown: 5,
    guildOnly: true,
    args: true,
    usage: '<user>',
    execute(message) {
        if (!message.mentions.users.size) {

            return message.reply('Why would I ban Casper? Growwww up!');
        }

        const taggedUser = message.mentions.users.first() || client.users.cache.get(args[0]);

        if (taggedUser) {
            message.guild.members.ban(taggedUser)
                .then(() => {
                    message.reply(`${user} has been exiled to a place far better than this`);
                })
                .catch(error => {
                    console.error(error);
                    message.reply(`Something went wrong trying to ban ${user}, but it's okay cause I kinda like them anyway.`);
                });
        }
    },
};
