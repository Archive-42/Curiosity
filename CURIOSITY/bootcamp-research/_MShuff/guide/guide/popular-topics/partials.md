# Partial Structures

Partial Structures were introduced to the library in version 12 and are optionally received whenever there is no sufficient data to emit the client event with a fully intact discord.js structure. They are (as the name suggests) incomplete and you cannot expect them to have any information besides their ID. All other properties and methods on this object should be considered invalid and defunct. Prior to this feature discord.js client events would simply not emit if one of the necessary structures could not be build with sufficient data to guarantee a fully functional structure with. If you do not opt into partials this is still the case.

One example leveraging partials is the handling of reactions on uncached messages, which is explained on [this page](/popular-topics/reactions.md#listening-for-reactions-on-old-messages).

Prior you had to either handle the undocumented `raw` event or fetch the respective messages on startup. The first approach was prone to errors and unexpected internal behavior and the second not fully fail proof either, as the messages could still be uncached if cache size was exceeded in busy channels.

<branch version="11.x">

Partials are not available in version 11, please update to version 12 of the library if you want to use partial structures in your bot.

</branch>
<branch version="12.x">

## Enabling Partials

As we said earlier partials do not have all the information necessary to make them fully functional discord.js structures, so it would not be a good idea to enable the functionality by default. Users should know how to handle them before opting in to this feature.

You choose which structures you want to emit as partials as client options when instantiating your bot client. Available structures are: `USER`, `CHANNEL` (only DM channels can be uncached, server channels will always be available), `GUILD_MEMBER`, `MESSAGE` and `REACTION`.

```js
const { Client } = require('discord.js');
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
```

:::warning
Make sure you enable all partials you need for your use case! If you miss one the event does not get emitted.
:::

:::warning
Partial structures are enabled globally. You can not make them work for only a certain event or cache and you very likely need to adapt other parts of your code that are accessing data from the relevant caches. All caches holding the respective structure type might return partials as well!
:::

## Handling Partial data

All structures you can choose to use partials for have a new property, fittingly called `.partial` indicating if it is a fully functional or partial instance of its class. The value is `true` if partial, `false` if fully functional.

:::warning
Partial data is only ever guaranteed to contain an ID! Do not assume any property or method to work when dealing with a partial structure!
:::

```js
if (message.partial) {
	console.log('The message is partial.');
} else {
	console.log('The message is not partial.');
}
```

## Obtaining the full structure

Along with `.partial` to check if the structure you call it on is partial or not the library also introduced a `.fetch()` method to retrieve the missing data from the API and complete the structure. The method returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) you need to handle. After the Promise resolved (and with it the missing data arrived) you can use the structure as you would before.

```js
if (message.partial) {
	console.log('The message is partial.');
	message.fetch()
		.then(fullmessage => {
			console.log(fullmessage.content);
		})
		.catch(error => {
			console.log('Something went wrong when fetching the message: ', error);
		});
} else {
	console.log('The message is not partial.');
}
```

:::warning
You can not fetch data from the API that's already deleted. For message deletions `messageDelete` will only emit with the ID, which you can not use to fetch the complete message containing content, author or other information for, as it is already inaccessible by the time you receive the event.
:::


</branch>
