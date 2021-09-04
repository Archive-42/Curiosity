module.exports = {
    name: 'prune',
    description: 'Deletes messages in bulk (1-99). Can NOT delete message older than 2 weeks',
    cooldown: 5,
    args: true,
    usage: '#1-99',
    execute(message, args) {
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.reply(`idiot... You need to actually give me a number of messages to prune!`);
        } else if (amount <= 1 || amount > 100) {
            return message.reply(`idiot... I can't delete that amount of messages in one action! I can do between 1 and 99 messages`);
        }

        message.channel.bulkDelete(amount, true).catch(error => {
            console.error(error);
            message.channel.send('There was an error trying to prune messages in this channel!');
        });
    },
};
