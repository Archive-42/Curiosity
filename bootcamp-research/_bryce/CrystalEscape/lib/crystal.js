const MovingObject = require('./moving_object');

class Crystal extends MovingObject {
	constructor(options) {
		console.log('New Crystal');
		super({
			path: Crystal.PATH,
			scale: Crystal.SCALE,
			spriteWidth: Crystal.SPRITE_WIDTH,
			spriteHeight: Crystal.SPRITE_HEIGHT,
			spriteMaxX: Crystal.SPRITE_MAX_X,
			spriteMaxY: Crystal.SPRITE_MAX_Y,
			vel: [Math.random() * Crystal.TOP_SPEED, Math.random() * Crystal.TOP_SPEED],
			pos: [
				options.game.gameCanvas.width - Crystal.WIDTH * 2,
				Math.floor(Math.random() * (options.game.gameCanvas.height - Crystal.HEIGHT + 1))
			],
			...options
		});
	}

	move() {
		//Restrict movement to window and bounce off edges
		if (this.pos[0] < 0) {
			this.vel[0] *= -1;
			this.pos[0] = 1;
		} else if (this.pos[0] > this.game.gameCanvas.width - this.width) {
			this.vel[0] *= -1;
			this.pos[0] = this.game.gameCanvas.width - this.width - 1;
		}

		if (this.pos[1] < 0) {
			this.vel[1] *= -1;
			this.pos[1] = 1;
		} else if (this.pos[1] > this.game.gameCanvas.height - this.height) {
			this.vel[1] *= -1;
			this.pos[1] = this.game.gameCanvas.height - this.height - 1;
		}

		super.move();
	}
}

Crystal.PATH = './assets/images/sprites/crystal.png';
Crystal.SPRITE_MAX_X = 4;
Crystal.SPRITE_MAX_Y = 1;
Crystal.SCALE = 2;
Crystal.SPRITE_WIDTH = 10;
Crystal.SPRITE_HEIGHT = 24;
Crystal.WIDTH = Crystal.SPRITE_WIDTH * Crystal.SCALE;
Crystal.HEIGHT = Crystal.SPRITE_HEIGHT * Crystal.SCALE;
Crystal.TOP_SPEED = 4;

module.exports = Crystal;
