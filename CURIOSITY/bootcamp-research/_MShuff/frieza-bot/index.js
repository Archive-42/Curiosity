/* *********************** FILE IMPORTS *************************** */
/* File Imports - Importing the code libraries we need for development
*    - Discord.js - Required to create any kind of Discord Bot
*    - Chalk - Node package for colored logging in terminals
*  NOTE - Comments are referring to the code BELOW them always.     */
const fs = require('fs');
const Discord = require('discord.js');
const chalk = require('chalk');
// The curly braces below are destructuring, basically saying go find these variables in the file listed (prefix, token).  You can see them in your config.json file for reference
const { prefix, token } = require('./config.json');
/* ******************** END OF FILE IMPORTS ************************ */


/* **************** INITIALIZATION AND VARIABLES ******************* */
// Just setting some easier aliases for our terminal logging colors
const greenBright = chalk.greenBright;
const redBright = chalk.redBright;
const whiteBright = chalk.whiteBright;
const inverse = chalk.inverse;
// Initialize Discord Client (Our bot)
const client = new Discord.Client();
// Collections are lists or JavaScript Map's with extended functionality
// You will have to research Maps, then Collections to get solid understanding.
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    console.log(inverse(`Loading ${file}...`));
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}
/* **************** END OF INITIALIZATION AND VARIABLES ************ */


/* *************** MESSAGE LISTENERS AND ACTIONS ******************* */
// When the client is ready, run this code
// This event will only trigger one time after logging in
client.once('ready', () => {
    // A console log prints something into the terminal
    console.log(`${redBright('Lord Frieza')} ${greenBright('walks into the room...')}`);
});


// Creates a 'listener' for the client too respond to incoming messages
// This will happen every time a message comes in. (Hence the client.on)
client.on('message', message => {

    // Check if message has a command prefix or not..
    // ! means NOT (i.e. !true = false, !false = true)
    if (!message.content.startsWith(prefix)) {
        // Check if the author of the message is a bot...
        if (message.author.bot) return;
        // If not a bot, log the chat to the terminal...
        return console.log(`${redBright(message.author.username)}: ${whiteBright(message.content)}`);
    }

    // .slice returns a certain slice of a string.  By doing prefix.length, we are cutting out the prefix from the message.  .trim is trimming the extra whitespace, and .split(/ +/) is splitting the words into a list by spaces
    // NOTE: The / +/ is considered regular expression(REGEX) testing.  This looks for one OR MORE spaces (Note the +). the forward slashes are the start/end of the test
    const args = message.content.slice(prefix.length).trim().split(/ +/);

    // .shift takes the first item out of the list (command following prefix), toLowerCase makes the command lowercase, and store in variable 'command'
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return message.reply(`that's not a command... Moron.`);

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply(`Moron, I can't do this inside of a DM`);
    }

    if (command.args && !args.length) {
        let reply = `${message.author}, I will have your head if you don't provide arguments with your command next time.`;

        if (command.usage) {
            reply += `\n\nHere's a hint: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`I'll ${command.name} your face! You're on timeout for another ${timeLeft.toFixed(1)} more second(s) dumbass!`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // We use try ... catch ... statements to avoid bugs crashing our app
    try {
        command.execute(message, args, commandName);
    } catch (error) {
        console.error(error);
        message.reply(`There was an error trying to execute ${commandName}!`);
    }

});
/* ********* END OF MESSAGE LISTENERS AND ACTIONS ******************* */

// login to Discord with your app's token
client.login(token);
