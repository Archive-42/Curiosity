module.exports = {
    name: 'region',
    description: 'Display Server Region',
    guildOnly: true,
    aliases: ['area', 'where'],
    cooldown: 5,
    args: false,
    usage: 'Does not take arguments',
    execute(message) {
        message.channel.send(`We are located in the ${message.guild.region} Region.`);
    },
};
