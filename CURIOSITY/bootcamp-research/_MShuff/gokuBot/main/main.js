// Import all necessary files, including tokens, except commands
const fs = require('fs');
const { prefix, token } = require('./config.json');
const Discord = require('discord.js');
const Bot = require('./bot.js');
// Intialize new client and new Bot instance with client & token
const client = new Discord.Client();
const gokuBot = new Bot(client, token);
// Create client commands and cooldowns Collections and Import command files
const cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();
// Loop through commands folder and Import commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log(`Importing ${file}...`);
    client.commands.set(command.name, command);
}
/***********************************************************************************/

gokuBot.login();

// Event handler for incoming messages
gokuBot.client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        client.commands.get('colorchat').execute(message);
        client.commands.get('emojicheck').execute(message);
        return;
    }

    // Separate command and arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();   // Considering remove the lowercase
    const command = client.commands.get(commandName)  // Set command based on alias/command name
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) {
        message.reply(`Gee, I don't think I know the command ${commandName}`);
        return;
    }

    // If command requires an actual server/channel, don't execute command
    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply(`I can't execute that command inside DMs!`);
    }

    // Remove command from chat history (simulates bot acting on his own accord)
    client.commands.get('prune').execute(message, '1');

    // If commands takes args and there are not args, inform and show usage of command
    if (command.args && !args.length) {
        let reply = `I can't really do that without any arguments, ${message.author}! :sweat_smile:`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    // If there is no cooldown for the command, set it
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection())
    }

    // Set cooldown time based on command setting or default of 3 seconds
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    // Check if author has a timeout, and if they do, inform them of time left
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \'${command.name}\' command.`);
        }
    } else {
        // Delete timestamp when applicable
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }

    // Attempt to execute command
    try {
        command.execute(message, args, commandName);
    } catch (error) {
        console.error(error)
        message.reply(`There was an error trying to execute that command!`);
    }
});

module.exports = {
     client,
}
