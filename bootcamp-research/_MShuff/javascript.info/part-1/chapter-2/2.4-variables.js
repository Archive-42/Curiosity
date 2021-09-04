(() => {
	'use strict';

	// Declaration
	let age; // Also initializes a space in memory

	// Assignment
	age = 33;

	// Reassignment
	age = 25;

	// Constant value that will not change
	const myName = 'Michael Shuff';

	// Constant value known before program runs
	const COLOR_RED = '#F00';

	// Block scoped, reassignable variable: Deprecated
	var myNumber = 10;

	// Using unicode non-Latin variables
	let имя = '...';
	let 我 = '...';

	// We can store emojis, but can't name variables with emojis
	const smiley = '😀';

	console.log(имя);
	console.log(smiley);
})();
