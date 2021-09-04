module.exports = {
    name: 'kick',
    description: 'Kicks a user from the server',
    cooldown: 5,
    guildOnly: true,
    args: true,
    usage: '<user>',
    execute(message) {
        if (!message.mentions.users.size) {

            return message.reply('You need to tag a user in order to kick them!');
        }

        const taggedUser = message.mentions.users.first() || client.users.cache.get(args[0]);

        message.channel.send(`You wanted to kick: ${taggedUser.username}??`);

        if (taggedUser) {
            const user = message.guild.member(taggedUser);
            if (user) {
                user.kick("Because I'm Frieza, bitch.")
                    .then(() => {
                        message.reply(`${user} has been successfully kicked.`);
                    })
                    .catch(error => {
                        console.error(error);
                        message.reply(`Error trying to kick ${user}`);
                    });
            }
        }
    },
};
