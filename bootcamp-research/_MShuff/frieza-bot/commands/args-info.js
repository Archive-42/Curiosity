module.exports = {
    name: 'args-info',
    description: 'Returns arguments passed back to user',
    cooldown: 5,
    args: true,
    usage: '<arg1> <arg2> <arg3> ... or try "Goku"',
    execute(message, args, commandName) {
        if (args[0].toLowerCase() === 'goku') {
            return message.channel.send(`Your first argument is...*reads Goku*... Oh, piss off!`);
        }
        message.channel.send(`Command name: ${commandName}\nArguments: ${args}`);
    },
};
