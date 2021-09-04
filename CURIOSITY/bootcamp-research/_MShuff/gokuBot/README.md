# GokuBot(Subject to Rename)

* runs in *./main/main.js &*
  * imports *Bot* Class from *.main/bot.js*
    * Goku is only my instance of the Bot class, which is why GokuBot is subject to rename
  * imports *Prefix Symbol* and *Bot Token* from *./main/config.json*
  * has 2 specs for the *checkToken* command in *./test/bot-spec.js*
* *bot.js* - This is where the *Bot Class* resides
  * constructor proerties:
    * client - The initiated client instance in Discord.  Needed to log in
    * token -  The unique id for the bot being loaded.  Also needed to log in
  * methods:
    * *login()* - Does some edge case error checks with *checkToken()* and logs Bot in
    * *checkToken()* - Checks to make sure the token being imported is a valid string
