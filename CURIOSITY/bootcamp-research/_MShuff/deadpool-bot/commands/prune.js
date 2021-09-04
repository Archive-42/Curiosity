module.exports = {
    name: 'prune',
    description: 'Deletes messages in bulk (1-99). Can NOT delete message older than 2 weeks',
    cooldown: 5,
    args: true,
    usage: '#1-99',
    execute(message, args) {
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number. Try 8675309.');
        } else if (amount <= 1 || amount > 100) {
            if (amount === 8675310) {
                return message.channel.send(`Hahahah! You actually tried it.  I love you, but you're an idiot.`);
            }
            return message.reply('you need to input a number between 1 and 99.');
        }

        message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err);
            message.channel.send('I tried pruning the channel, but I ended up pruning my... Well, you know.');
        });
    },
};
