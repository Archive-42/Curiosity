const Game = require('./game');

document.addEventListener('DOMContentLoaded', () => {
	const backgroundCanvas = document.getElementById('background-canvas');
	const backgroundCtx = backgroundCanvas.getContext('2d');

	const midgroundCanvas = document.getElementById('midground-canvas');
	const midgroundCtx = midgroundCanvas.getContext('2d');

	const gameCanvas = document.getElementById('game-canvas');
	const gameCtx = gameCanvas.getContext('2d');

	const HUDCanvas = document.getElementById('hud-frame-canvas');
	const HUDCtx = HUDCanvas.getContext('2d');

	const game = new Game({ gameCanvas, gameCtx, midgroundCtx, backgroundCtx, HUDCtx });
	game.step();
});
