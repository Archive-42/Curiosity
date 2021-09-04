module.exports = {
    name: 'args-info',
    description: 'Returns arguments passed back to user',
    cooldown: 5,
    args: true,
    usage: '<arg1> <arg2> <arg3> ...',
    execute(message, args, commandName) {
        if (args[0].toLowerCase() === 'wolverine') {
            return message.channel.send(`...God I love that little man!`);
        }
        message.channel.send(`Command name: ${commandName}\nArguments: ${args}`);
    },
};
