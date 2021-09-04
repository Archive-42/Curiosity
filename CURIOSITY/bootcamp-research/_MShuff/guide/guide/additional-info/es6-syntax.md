# ES6 syntax examples

If you've used JavaScript for only a (relatively) small amount of time or just aren't very experienced with it, you might not be aware of what ES6 is and its crazy beneficial features. Since this is a guide primarily for Discord bots, we'll be using some discord.js code as an example of what you might have, versus what you could do to benefit from ES6.

Here's the startup code we'll be using:

<!-- eslint-disable prefer-template -->

```js
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.once('ready', () => {
	console.log('Ready!');
});

const { prefix } = config;

client.on('message', message => {
	if (message.content === prefix + 'ping') {
		message.channel.send('Pong.');
	} else if (message.content === prefix + 'beep') {
		message.channel.send('Boop.');
	} else if (message.content === prefix + 'server') {
		message.channel.send('Guild name: ' + message.guild.name + '\nTotal members: ' + message.guild.memberCount);
	} else if (message.content === prefix + 'user-info') {
		message.channel.send('Your username: ' + message.author.username + '\nYour ID: ' + message.author.id);
	}
});

client.login(config.token);
```

If you haven't noticed, this piece of code is actually already using a bit of ES6 in here! The `const` keyword and arrow function syntax (`() => ...`) are a part of ES6, and are recommended to use whenever possible.

As for the code above, there are a few places where things can be done better. Let's look at them.

## Template literals

If you check the code above, it's currently doing things like `prefix + 'name'` and `'Your username: ' + message.author.username`, which is perfectly valid. It is a bit hard to read, though, it's not too fun to constantly type out. Fortunately, there's a better alternative.

<!-- eslint-skip -->

```js
// ES5 version, as we currently have it
else if (message.content === prefix + 'server') {
	message.channel.send('Guild name: ' + message.guild.name + '\nTotal members: ' + message.guild.memberCount);
}
else if (message.content === prefix + 'user-info') {
	message.channel.send('Your username: ' + message.author.username + '\nYour ID: ' + message.author.id);
}
```

<!-- eslint-skip -->

```js
// ES6 version, using template literals
else if (message.content.startsWith(`${prefix}server`)) {
	message.channel.send(`Guild name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
}
else if (message.content.startsWith(`${prefix}user-info`)) {
	message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
}
```

Easier to read, easier to write! The best of both worlds.

### Template literals vs string concatenation

If you've used other programming languages, you might be familiar with the term "string interpolation". Template literals would be JavaScript's implementation of string interpolation. If you're familiar with the heredoc syntax, it's very much like that; it allows for string interpolation, as well as multiline strings.

The example below won't go too much into detail about it, but if you're interested in reading more, you can [read about them on MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals).

```js
// variables/function used throughout the examples
const username = 'Sanctuary';
const password = 'pleasedonthackme';

function letsPretendThisDoesSomething() {
	return 'Yay for sample data.';
}
```

<!-- eslint-disable prefer-template -->

```js
// regular string concatenation
console.log('Your username is: **' + username + '**.');
console.log('Your password is: **' + password + '**.');

console.log('1 + 1 = ' + (1 + 1));

console.log('And here\'s a function call: ' + letsPretendThisDoesSomething());

console.log(
	'Putting strings on new lines\n'
	+ 'can be a bit painful\n'
	+ 'with string concatenation. :('
);
```

```js
// template literals
console.log(`Your password is: **${password}**.`);
console.log(`Your username is: **${username}**.`);

console.log(`1 + 1 = ${1 + 1}`);

console.log(`And here's a function call: ${letsPretendThisDoesSomething()}`);

console.log(`
	Putting strings on new lines
	is a breeze
	with template literals! :)
`);

// NOTE: template literals will also render the indentation inside them
// there are ways around that, which we'll discuss in another section.
```

You can see how it makes things easier and more readable. In some cases, it can even make your code shorter! This one is something you'll definitely want to take advantage of as much as possible.

## Arrow functions

Arrow functions are shorthand for regular functions, with the addition that they use a lexical `this` context inside of their own. If you don't know what the `this` keyword is referring to, don't worry about it; you'll learn more about it as you advance.

Here are some examples of ways you can benefit from arrow functions over regular functions:

<!-- eslint-disable func-names, no-var, prefer-arrow-callback, prefer-template -->

```js
// regular functions, full ES5
client.once('ready', function() {
	console.log('Ready!');
});

client.on('typingStart', function(channel, user) {
	console.log(user + ' started typing in ' + channel);
});

client.on('message', function(message) {
	console.log(message.author + ' sent: ' + message.content);
});

var doubleAge = function(age) {
	return 'Your age doubled is: ' + (age * 2);
};

// inside a message collector command
var filter = function(m) {
	return m.content === 'I agree' && !m.author.bot;
};

var collector = message.createReactionCollector(filter, { time: 15000 });
```

```js
// arrow functions, full ES6
client.once('ready', () => console.log('Ready!'));

client.on('typingStart', (channel, user) => console.log(`${user} started typing in ${channel}`));

client.on('message', message => console.log(`${message.author} sent: ${message.content}`));

const doubleAge = age => `Your age doubled is: ${age * 2}`;

// inside a message collector command
const filter = m => m.content === 'I agree' && !m.author.bot;
const collector = message.createReactionCollector(filter, { time: 15000 });
```

There are a few important things you should note here:

* The parenthesis around function parameters are optional when you have only one parameter, but required otherwise. If you feel like this will confuse you at times, it may be a good idea to just always use parenthesis.
* You can cleanly put what you need on a single line without curly braces.
* Omitting curly braces will make arrow functions use **implicit return**, but only if you have a single-line expression. The `doubleAge` and `filter` variables are a good example of this.
* Unlike the `function someFunc() { ... }` declaration, arrow functions cannot be used to create functions with such syntax. You can create a variable and give it an anonymous arrow function as the value, though (as seen with the `doubleAge` and `filter` variables).

We won't be covering the lexical `this` scope with arrow functions in here, but you can Google around if you're still curious. Again, if you aren't sure what `this` is or when you need it, reading about lexical `this` first may only confuse you. 

## Destructuring

Destructuring is an easy way to extract items from an object or array. If you've never seen the syntax for it before, it can be a bit confusing, but it's actually very easy to understand once explained!

### Object destructuring

Here's a common example where object destructuring would come in handy:

<!-- eslint-skip -->

```js
const config = require('./config.json');
const prefix = config.prefix;
const token = config.token;

// Alternative version (not recommended)
const prefix = require('./config.json').prefix;
const token = require('./config.json').token;
```

This is a bit verbose and not the most fun to write out each time. Object destructuring simplifies this, making it easier to both read and write. Take a look:

```js
const { prefix, token } = require('./config.json');
```

Object destructuring takes those properties from the object and stores them in variables. If the property doesn't exist, it'll still create a variable, but with the value of `undefined`. So instead of using `config.token` in your `client.login()` method, you'd simply use `token`. And since destructuring creates a variable for us, you don't even need that `const prefix = config.prefix` line. Pretty cool!

Additionally, you could do this for your commands.

```js
client.on('message', message => {
	const { content } = message;

	if (content === `${prefix}ping`) {
		// ping command here...
	} else if (content === `${prefix}beep`) {
		// beep command here...
	}
	// other commands here...
});
```

It is a bit less to write out, and also looks cleaner, but shouldn't be necessary if you follow along with the [command handler](/command-handling/) part of the guide.

You can also rename variables when destructuring, if necessary. A good example of when you'd need to do so is when you're extracting a property with a name that's already being used, or conflicts with a reserved keyword. The syntax is as follows:

```js
// `default` is a reserved keyword
const { 'default': defaultValue } = someObject;

console.log(defaultValue);
// 'Some default value here'
```

### Array destructuring

Array destructuring syntax is very similar to object destructuring, except that you use brackets instead of curly braces. In addition, since you're using it on an array, you destructure the items in the same order the array is. Without array destructuring, this is how you'd extract items from an array:

```js
// assuming we're in a `profile` command and have an `args` variable
const name = args[0];
const age = args[1];
const location = args[2];
```

Just like the first example with object destructuring, this is a bit verbose and not fun to write out. Array destructuring eases this pain.

```js
const [name, age, location] = args;
```

A single line of code that makes things much cleaner! In some cases, you may not even need all items in the array (e.g. when using `string.match(regex)`). Array destructuring still allows you to operate in the same sense.

```js
const [, username, id] = message.content.match(someRegex);
```

In this snippet, we use a comma without providing a name for the item in the array we don't need. You can also give it a placeholder name if you prefer, of course; it's entirely preference at that point.

## var, let, and const

Since there are many, many articles out there that can explain this part more in depth, we'll only be giving you a TL;DR and an article link if you choose to read more about it.

1. The `var` keyword is what was (and can still be) used in JS before `let` and `const` came to surface. There are actually many issues with `var`, though, such as it being function-scoped, hoisting related issues, and allowing redeclaration.
2. The `let` keyword is essentially the new `var`; it addresses many of the issues `var` has, but its biggest factor would be that it's block-scoped and disallows redeclaration (*not* reassignment).
3. The `const` keyword is for giving variables a constant value which may not be reassigned. `const`, like `let`, is also block-scoped.

The general rule of thumb recommended by this guide is to use `const` wherever possible, `let` otherwise, and avoid using `var`. Here's a [helpful article](https://madhatted.com/2016/1/25/let-it-be) if you want to read more about this subject.

