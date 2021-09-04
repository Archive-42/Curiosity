module.exports = {
    name: 'prune',
    args: true,
    usage: '1-99 <-- Number of lines to delete',
    description: 'Delete 1-99 lines from channel',
    guildOnly: true,
    cooldown: 5,
    aliases: ['delete', 'bulkdelete', 'pop'],
    execute(message, args) {
        const amount = parseInt(args[0]);

        if (isNaN(amount)) {
            return message.reply(`That doesn't seem to be a valid number...`);
        } else if (amount < 1 || amount > 100) {
            return message.reply('You need to input a number between 1 and 99');
        } else if (message.channel.type === 'dm') {
            return;
        }
        // Second argument passed will filter out messages older than 2 weeks if true
        // Messages older than 2 weeks can't be deleted, so this is necessary.
        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send(`There was an error trying to prune messages in this channel!`);
        });
    },
};
