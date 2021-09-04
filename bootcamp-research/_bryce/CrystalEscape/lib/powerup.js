const StaticObject = require('./static_object');

class Powerup extends StaticObject {
	constructor(options) {
		super({
			path: Powerup.PATH,
			scale: Powerup.SCALE,
			spriteWidth: Powerup.SPRITE_WIDTH,
			spriteHeight: Powerup.SPRITE_HEIGHT,
			spriteMaxX: Powerup.SPRITE_MAX_X,
			spriteMaxY: Powerup.SPRITE_MAX_Y,
			spriteYOffset: Powerup.SPRITE_HEIGHT * options.index,
			...options
		});

		switch (options.index) {
			case 0:
				this.type = 'Bigger Bullets!';
				break;
			case 1:
				this.type = 'Faster Bullets!';
				break;
			case 2:
				this.type = 'So Agile!';
				break;
			case 3:
				this.type = 'Reload Faster!';
				break;
		}

		this.draw = this.draw.bind(this);
	}

	draw(ctx) {
		super.draw(ctx);
		if (this.framesDrawn > Powerup.DURATION) this.remove();
	}
}

Powerup.PATH = './assets/images/sprites/power-up.png';
Powerup.SPRITE_MAX_X = 2;
Powerup.SPRITE_MAX_Y = 1;
Powerup.SCALE = 1;
Powerup.SPRITE_WIDTH = 16;
Powerup.SPRITE_HEIGHT = 16;
Powerup.WIDTH = Powerup.SPRITE_WIDTH * Powerup.SCALE;
Powerup.HEIGHT = Powerup.SPRITE_HEIGHT * Powerup.SCALE;
Powerup.DURATION = 600;

module.exports = Powerup;
