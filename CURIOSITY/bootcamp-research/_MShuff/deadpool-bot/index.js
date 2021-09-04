const fs = require('fs');
const Discord = require('discord.js');
const chalk = require('chalk');
const { prefix, token } = require('./config.json');

const greenBright = chalk.greenBright;
const redBright = chalk.redBright;
const whiteBright = chalk.whiteBright;
const inverse = chalk.inverse;

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(greenBright(`${redBright('Deadpool')} is up and running!`));
});

client.on('message', message => {
    if (!message.content.startsWith(prefix)) {
        if (message.author.bot) return;

        return console.log(`${redBright(message.author.username)}: ${whiteBright(message.content)}`);
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply(`Silly rabbit, that command is for public channels!`);
    }

    if (command.args && !args.length) {
        let reply = `I'm gonna need some more info than that, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\`, or a dildo works.`;
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
            return message.reply(`You're on timeout for another ${timeLeft.toFixed(1)} second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Something went very, very, wrong...');
    }

});

client.login(token);
