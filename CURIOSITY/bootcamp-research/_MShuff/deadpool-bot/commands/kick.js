module.exports = {
    name: 'kick',
    description: 'Kicks a user from the server',
    cooldown: 5,
    guildOnly: true,
    args: true,
    usage: '<user>',
    execute(message) {
        if (!message.mentions.users.size) {

            return message.reply('I told you once, I am NOT kicking Casper!');
        }

        const taggedUser = message.mentions.users.first() || client.users.cache.get(args[0]);

        message.channel.send(`You wanted to kick: ${taggedUser.username}?? I assure you there's far worse people than him!`);

        if (taggedUser) {
            const user = message.guild.member(taggedUser);
            if (user) {
                user.kick("Have fun at your midnight showing of Blade II")
                    .then(() => {
                        message.reply(`${user} has been successfully sent to watch 'Green Lantern' for eternity! Haaahaa!`);
                    })
                    .catch(error => {
                        console.error(error);
                        message.reply(`I don't really feel like kicking ${user}. Just kidding! An error occured`);
                    });
            }
        }
    },
};
