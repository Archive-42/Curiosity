# frieza-bot

Basic DiscordJS bot. The almighty and powerful, Lord Frieza. I'll be documenting my basic setup with him. The instructions are far inferior to the [guide](https://discordjs.guide/)

1. Create a new folder, and inside of it...

   - `npm init -y` - Initialize a new NPM packge
   - `npm i discord.js chalk` - Install discord.js and chalk(colors)
   - `npm i -D nodemon eslint ` - Install development dependencies
   - Create a `.eslintrc.json` file for linting

2. Create an `index.js` in your project's root folder
    ```javascript
    const Discord = require('discord.js');
    const client = new Discord.Client();

    client.once('ready', () => {
    console.log('Ready!');
    });
    client.login('your-token-goes-here');
    ```
