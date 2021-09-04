module.exports = {
    name: 'convert',
    description: 'Converts decimal to chose base',
    args: true,
    usage: '[base 10 number], base',
    guildOnly: false,
    cooldown: 5,
    aliases: [],
    execute(message, args) {
        if (!args.length) return message.channel.send(`I need a number to convert.`);
        try {
            let number = Number(args[0]);
            let base = Number(args[1]);
            let originalNum = number;
            let nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

            if (base > 17) return message.channel.send(`Sorry, I can't do bases higher than 16 yet :(`);
            if (isNaN(number) || number <= 0) return message.channel.send(`I need a number to convert.`);
            let baseVal = [];

            while (number > 0) {
                baseVal.push(nums[number % base]);
                number = Math.floor(number / base);
                // console.log(number);
            }

            return message.channel.send(`Number: ${originalNum} Base ${(base === 2) ? '2 (binary)' : (base === 8) ? '8 (octal)' : (base === 16) ? '16 (hexadecimal)' : base }: ${baseVal.reverse().join('')}`);
        } catch (error) {
            console.error(error);
            message.channel.send(`There was an error somewhere. :)`);
        }
    },
};
