module.exports = {
    name: 'unban',
    description: 'Unbans a user from the server',
    cooldown: 5,
    guildOnly: true,
    args: true,
    usage: '<user id>',
    execute(message, args) {
        const id = args[0];

        message.guild.members.unban(id)
            .then(() => {
                message.reply(`User ${id} has been successfully unbanned.`);
            })
            .catch(error => {
                console.error(error);
                message.reply(`Error trying to unban ${id}`);
            });

    },
};
