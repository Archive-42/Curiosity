module.exports = {
    name: 'avatar',
    // Aliases must always be an array of strings. An array [] is a list
    aliases: ['icon', 'pfp'],
    description: 'Displays avatar of user/mentions',
    cooldown: 5,
    usage: '@mention1 @mention2 @mention3 ...',
    execute(message) {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: ${message.author.displayAvatarURL({ format: "png", dynamic: true })}`);
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: ${user.displayAvatarURL({ format: "png", dynamic: true })}`;
        });


        message.channel.send(avatarList);
    },
};
