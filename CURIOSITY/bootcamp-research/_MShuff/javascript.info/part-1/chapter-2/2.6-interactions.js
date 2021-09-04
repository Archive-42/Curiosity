document.addEventListener('DOMContentLoaded', (event) => {
	console.log('DOMContentLoaded!');
	alert('Welcome to the page!');
	let user = prompt("What's your username?", 'Johannes Kepler') || 'default';
	let over18 = confirm('Are you over 18?');

	alert(
		`Welcome, ${user}! ${
			over18 ? 'Glad to see you are an adult' : 'You should not be here...'
		}`
	);
});
