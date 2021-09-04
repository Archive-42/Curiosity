module.exports = {
    name: 'ban',
    description: 'Bans a user from the server',
    cooldown: 5,
    guildOnly: true,
    args: true,
    usage: '<user>',
    execute(message) {
        if (!message.mentions.users.size) {

            return message.reply('You need to tag a user in order to ban them!');
        }

        const taggedUser = message.mentions.users.first() || client.users.cache.get(args[0]);

        if (taggedUser) {
            message.guild.members.ban(taggedUser)
                .then(() => {
                    message.reply(`${user} has been successfully banned.`);
                })
                .catch(error => {
                    console.error(error);
                    message.reply(`Error trying to ban ${user}`);
                });
        }
    },
};
