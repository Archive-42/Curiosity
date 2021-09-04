module.exports = {
    name: 'reload',
    description: 'Reloads a command',
    args: true,
    execute(message, args) {
        const commandName = args[0].toLowerCase();
        // Note how we access the client(bot) from the message property
        const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);

        delete require.cache[require.resolve(`./${command.name}.js`)];

        try {
            const newCommand = require(`./${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);

            message.channel.send(`Command \`${command.name}\` was reloaded succesfully!  Not such a moron after all, eh?`);
        } catch (error) {
            console.error(error);
            message.channel.send(`There was an error while reloading \`${command.name}\`:\n\`${error.message}\``);
        }
    },
};
