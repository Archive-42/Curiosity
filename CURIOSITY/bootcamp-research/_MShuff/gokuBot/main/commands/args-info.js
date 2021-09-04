module.exports = {
    name: 'args-info',
    description: 'Display arguments passed to Bot',
    args: true,
    usage: 'arg1[, arg2, arg3, ...] (parameters inside [] are optional)',
    guildOnly: false,
    cooldown: 5,
    aliases: ['args', 'arg-info', 'arguments'],
    execute(message, args, commandName) {
        message.channel.send(`Command name: ${commandName}\nArguments: ${args}\nArguments Length: ${args.length}`);
    },
};
