module.exports = {
    name: 'avatar',
    description: "Show's all mentioned user's and caller's Avatar Image(or just caller with no args)",
    args: false,
    usage: '[mention1, mention2, ...] (parameters inside [] are optional)',
    guildOnly: false,
    cooldown: 5,
    aliases: ['pfp', 'profile', 'icon'],
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
