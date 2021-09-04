# Commands with user input (a.k.a. "arguments")

::: tip
This page is a follow-up and bases its code off of [the previous page](/creating-your-bot/adding-more-commands.md).
:::

Sometimes you'll want to determine the result of a command depending on user input. It's a very common case with a very simple solution. This section will teach you how to extract user input from a message and use it in your code. Generally, you'll hear other people refer to this as "arguments", and you should refer to them as that as well.

## Basic arguments

We'll actually be tackling 2 things at once here. Things will be explained along the way, so don't worry if you don't understand immediately.

Go to your main bot file and find the `client.on('message', ...)` bit. Add the following block of code at the top of this event listeners callback function (the part we replaced with `...` here).

```js
// client.on('message', message => {
if (!message.content.startsWith(prefix) || message.author.bot) return;

const args = message.content.slice(prefix.length).trim().split(' ');
const command = args.shift().toLowerCase();
// the rest of your code
```

1. If the message either doesn't start with the prefix or was sent by a bot, exit early.
2. Create an `args` variable that slices off the prefix entirely, removes the leftover whitespaces and then splits it into an array by spaces.
3. Create a `command` variable by calling `args.shift()`, which will take the first element in array and return it while also removing it from the original array (so that you don't have the command name string inside the `args` array).

Hopefully that's a bit clearer, if there was any confusion. Let's create a quick command to check out the result of our new addition:

<!-- eslint-skip -->

```js
// using the new `command` variable, this makes it easier to manage!
// you can switch your other commands to this format as well
else if (command === 'args-info') {
	if (!args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}

	message.channel.send(`Command name: ${command}\nArguments: ${args}`);
}
```

If you try it out, you'll get something like this:

<div is="discord-messages">
	<discord-message author="User" avatar="djs">
		!args-info here are my arguments
	</discord-message>
	<discord-message author="Tutorial Bot" avatar="blue" :bot="true">
		Command name: args-info <br>
		Arguments: here,are,my,arguments
	</discord-message>
</div>

Looks good! Don't worry about the comma separation; that's the expected output when trying to send an array as a string.

Now that you have an array of arguments, you can interact with it accordingly! Try out this small addition to the command:

<!-- eslint-skip -->

```js
else if (command === 'args-info') {
	if (!args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}
	else if (args[0] === 'foo') {
		return message.channel.send('bar');
	}

	message.channel.send(`First argument: ${args[0]}`);
}
```

So if the first argument provided is equal to "foo", then send back "bar". Otherwise, just send back the argument the user provided.

<div is="discord-messages">
	<discord-message author="User" avatar="djs">
		!args-info foo
	</discord-message>
	<discord-message author="Tutorial Bot" avatar="blue" :bot="true">
		bar
	</discord-message>
	<discord-message author="User" avatar="djs">
		!args-info not-foo
	</discord-message>
	<discord-message author="Tutorial Bot" avatar="blue" :bot="true">
		First argument: not-foo
	</discord-message>
</div>

### Caveats

Currently, you're using `.split(' ')` to split the command arguments. However, there's actually a slight issue with this. As is, it'll split the string by each and every space. Well, what happens if someone accidentally (or even purposely) adds additional spaces? Here's what:

<div is="discord-messages">
	<discord-message author="User" avatar="djs">
		!args-info     here    are    my    arguments
	</discord-message>
	<discord-message author="Tutorial Bot" avatar="blue" :bot="true">
		Command name: args-info <br>
		Arguments: here,,,,,are,,,,,my,,,,,,arguments <br>
		Argument length: 20
	</discord-message>
</div>

If you've never done something like this before, this probably isn't what you'd expect, right? Thankfully, there's a simple solution for this issue. The red line is what to remove, and the green line is what to replace it with.

```diff
- const args = message.content.slice(prefix.length).trim().split(' ');
+ const args = message.content.slice(prefix.length).trim().split(/ +/);
```

<div is="discord-messages">
	<discord-message author="User" avatar="djs">
		!args-info     here    are    my    arguments
	</discord-message>
	<discord-message author="Tutorial Bot" avatar="blue" :bot="true">
		Command name: args-info <br>
		Arguments: here,are,my,arguments <br>
		Argument length: 4
	</discord-message>
</div>

Awesome! Nothing to worry in that regard about now. You're now using something called a "regular expression" (commonly referred to as "regex") to handle that small (but important) bug.

## Common situations with arguments

Here is where we'll be going over a few common situations where you'll want to make sure that an argument fits a certain criteria.

## Mentions

Using the example of a kick command, you most likely want it to allow the user to use the command and mention the person to kick, right? We won't actually be constructing the full kick command in this example, but here's how you can go about it:

<!-- eslint-skip -->

```js
else if (command === 'kick') {
	// grab the "first" mentioned user from the message
	// this will return a `User` object, just like `message.author`
	const taggedUser = message.mentions.users.first();

	message.channel.send(`You wanted to kick: ${taggedUser.username}`);
}
```

And as you can see, it works!

<div is="discord-messages">
	<discord-message author="User" avatar="djs">
		!kick <mention>Tutorial Bot</mention>
	</discord-message>
	<discord-message author="Tutorial Bot" avatar="blue" :bot="true">
		You wanted to kick: Tutorial Bot
	</discord-message>
</div>

But what happens if you try to use the command without mentioning anybody? If you try it yourself, you'll notice that the bot doesn't respond (due to it crashing), and you should see something like this in your console:

```
message.channel.send(`You wanted to kick: ${taggedUser.username}`);
                                                      ^

TypeError: Cannot read property 'username' of undefined
```

That's because you're trying to access the `username` property of a user you didn't mention! Since `message.mentions.users` is a Collection and you're trying to call `.first()` on an empty Collection, it'll return `undefined`. You can add a quick coherence check above the `const taggedUser = ...` line to prevent this from happening.

```js
if (!message.mentions.users.size) {
	return message.reply('you need to tag a user in order to kick them!');
}
```

::: tip
If you're wondering what `message.reply()` does, it's just an alternative for `message.channel.send()` which also prepends a mention of the person who sent the message, unless used in a DM. It can be very useful for providing feedback!
:::

Since `message.mentions.users` is a Collection, it has a `.size` property. If no users are mentioned, it'll return 0 (which is a `falsy` value), meaning you can do `if (!value)` to check if it's falsy.

If you try again, it should work as expected.

<div is="discord-messages">
	<discord-message author="User" avatar="djs">
		!kick
	</discord-message>
	<discord-message author="Tutorial Bot" avatar="blue" :bot="true">
		<mention :highlight="true">User</mention>, you need to tag a user to kick them!
	</discord-message>
	<discord-message author="User" avatar="djs">
		!kick <mention>Tutorial Bot</mention>
	</discord-message>
	<discord-message author="Tutorial Bot" avatar="blue" :bot="true">
		You wanted to kick: Tutorial Bot
	</discord-message>
</div>

### Working with multiple mentions

Let's say you have some sort of `!avatar` command, where it'll display the avatar of all the mentioned users, or your own avatar if no users were mentioned. Focus on that 2nd part for now - how would you go about displaying your own avatar if no users were mentioned? Taking the snippet for the code you just used, you can do it just like this:

<branch version="11.x">

<!-- eslint-skip -->

```js
else if (command === 'avatar') {
	if (!message.mentions.users.size) {
		return message.channel.send(`Your avatar: <${message.author.displayAvatarURL}>`);
	}

	// ...
}
```

</branch>
<branch version="12.x">

<!-- eslint-skip -->

```js
else if (command === 'avatar') {
	if (!message.mentions.users.size) {
		return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
	}

	// ...
}
```

If the `dynamic` option is provided you will receive a `.gif` URL if the image is animated, otherwise it will fall back to the specified `format` or its default `.webp` if none is provided.

</branch>

That part is simple; just recycle the if statement you used in the section above and displaying the link to your avatar.

<div is="discord-messages">
	<discord-message author="User" avatar="djs">
		!avatar
	</discord-message>
	<discord-message author="Tutorial Bot" avatar="blue" :bot="true">
		Your avatar:
		https://cdn.discordapp.com/avatars/328037144868290560/1cc0a3b14aec3499632225c708451d67.png
	</discord-message>
</div>

The next part is where it takes a turn - displaying the avatars of all the mentioned users. But it's simpler than you may think! `message.mentions.users` returns a Collection (as previously mentioned), which you can loop over in a number of different ways. You'll be using `.map()` to loop here, since it allows you to easily collect and store data in a variable in order to send 1 final message in the end, as opposed to multiple.

<branch version="11.x">

<!-- eslint-skip -->

```js
else if (command === 'avatar') {
	if (!message.mentions.users.size) {
		return message.channel.send(`Your avatar: <${message.author.displayAvatarURL}>`);
	}

	const avatarList = message.mentions.users.map(user => {
		return `${user.username}'s avatar: <${user.displayAvatarURL}>`;
	});

	// send the entire array of strings as a message
	// by default, discord.js will `.join()` the array with `\n`
	message.channel.send(avatarList);
}
```

</branch>
<branch version="12.x">

<!-- eslint-skip -->

```js
else if (command === 'avatar') {
	if (!message.mentions.users.size) {
		return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
	}

	const avatarList = message.mentions.users.map(user => {
		return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
	});

	// send the entire array of strings as a message
	// by default, discord.js will `.join()` the array with `\n`
	message.channel.send(avatarList);
}
```

If the `dynamic` option is provided you will receive a `.gif` URL if the image is animated, otherwise it will fall back to the specified `format` or its default `.webp` if none is provided.

</branch>

And ta-da! You now have a list of avatar links of all the users you tagged.

<div is="discord-messages">
	<discord-message author="User" avatar="djs">
		!avatar <mention :highlight="true">User</mention> <mention>Tutorialbot</mention>
	</discord-message>
	<discord-message author="Tutorial Bot" avatar="blue" :bot="true">
		User's avatar:
		https://cdn.discordapp.com/avatars/328037144868290560/1cc0a3b14aec3499632225c708451d67.png<br>
		Tutorial Bot's avatar:
		https://cdn.discordapp.com/avatars/459757708720209940/d48f3d90d923e9531c02c6bb9850339f.png
	</discord-message>
</div>

It does take up a lot of screen, but this is just an example command anyway.

::: tip
If you're looking for a more advanced way to handle mentions as arguments you can check out [this guide](/miscellaneous/parsing-mention-arguments.md).
:::

## Number ranges

Sometimes you'll want users to give you input that ranges from X to Y, but nothing outside of that. Additionally, you want to make sure that they do give you an actual number and not random characters. A good example of this would be a `!prune` command, where it deletes X messages in the channel, depending on what the user inputs.

The first step would be to check if the input they gave is an actual number.

<!-- eslint-skip -->

```js
else if (command === 'prune') {
	const amount = parseInt(args[0]);

	if (isNaN(amount)) {
		return message.reply('that doesn\'t seem to be a valid number.');
	}

	// ...
}
```

And if you test it, it should work as expected.

<div is="discord-messages">
	<discord-message author="User" avatar="djs">
		!prune some-string
	</discord-message>
	<discord-message author="Tutorial Bot" avatar="blue" :bot="true">
		<mention :highlight="true">User</mention>, that doesn't seem to be a valid number.
	</discord-message>
</div>

So what you need to do next is check if the first argument is between X and Y. Following the idea of a prune command, you'll most likely want to use the `.bulkDelete()` method, which allows you to delete multiple messages in one fell swoop.

With that being said, that method does have its limits: you can only delete a minimum of 2 and a maximum of 100 messages (at a time). Fortunately, there are a few ways to deal with that. One of those ways would be to just check the value of the `amount` variable, like so:

```js
if (isNaN(amount)) {
	return message.reply('that doesn\'t seem to be a valid number.');
} else if (amount < 2 || amount > 100) {
	return message.reply('you need to input a number between 2 and 100.');
}

// ...
```

Now all that's left is to delete the messages! It's a simple single line of code:

```js
message.channel.bulkDelete(amount);
```

And you've got a working prune command! Create a test channel, send a few random messages, and test it out.

### Caveats

You should note that there are actually a few caveats with the `.bulkDelete()` method. The first would be the trying to delete messages older than 2 weeks, which would normally error. Here's an easy fix for that:

```js
message.channel.bulkDelete(amount, true);
```

The second parameter in the `.bulkDelete()` method will filter out messages older than 2 weeks if you give it a truthy value. So if there are 50 messages and 25 of them are older than 2 weeks, it'll only delete the first 25 without throwing an error. However, if all the messages you're trying to delete are older than 2 weeks, then it will still throw an error. Knowing this, you should catch that error by chaining a `.catch()`.

```js
message.channel.bulkDelete(amount, true).catch(err => {
	console.error(err);
	message.channel.send('there was an error trying to prune messages in this channel!');
});
```

::: tip
If you aren't familiar with the `.catch()` method, it's used to catch errors on Promises. Unsure what Promises are? Google around for more info!
:::

The other caveat with this is that the `!prune {number}` message you sent will also count towards the amount deleted. What this means is that if you send `!prune 2`, it'll delete that message and only one other. There are a couple ways around this, but we'll be taking the easiest route for the sake of the tutorial. Here are the edits to make to your current code:

```diff
- const amount = parseInt(args[0]);
+ const amount = parseInt(args[0]) + 1;
```

```diff
- else if (amount < 2 || amount > 100) {
-	return message.reply('you need to input a number between 2 and 100.');
- }
+ else if (amount <= 1 || amount > 100) {
+	return message.reply('you need to input a number between 1 and 99.');
+ }
```

## Resulting code

<resulting-code />
