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
                message.reply(`User ${id} has successfully rejoined the Avengers... Not really, but hey, Ant Man got in, right?`);
            })
            .catch(error => {
                console.error(error);
                message.reply(`${id} is not getting unbanned because they remind me of Ajax.  Yes, the bathroom cleaner.`);
            });

    },
};
