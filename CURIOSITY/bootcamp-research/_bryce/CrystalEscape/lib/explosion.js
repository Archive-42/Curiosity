const StaticObject = require('./static_object');

class Explosion extends StaticObject {
	constructor(options) {
		super({
			path: Explosion.PATH,
			scale: Explosion.SCALE,
			spriteWidth: Explosion.SPRITE_WIDTH,
			spriteHeight: Explosion.SPRITE_HEIGHT,
			spriteMaxX: Explosion.SPRITE_MAX_X,
			spriteMaxY: Explosion.SPRITE_MAX_Y,
			...options
		});

		this.draw = this.draw.bind(this);
	}

	draw(ctx) {
		super.draw(ctx);
		if (this.framesDrawn > Explosion.DURATION) this.remove();
	}
}

Explosion.PATH = './assets/images/sprites/explosion.png';
Explosion.SPRITE_MAX_X = 5;
Explosion.SPRITE_MAX_Y = 1;
Explosion.SCALE = 2;
Explosion.SPRITE_WIDTH = 16;
Explosion.SPRITE_HEIGHT = 16;
Explosion.WIDTH = Explosion.SPRITE_WIDTH * Explosion.SCALE;
Explosion.HEIGHT = Explosion.SPRITE_HEIGHT * Explosion.SCALE;
Explosion.DURATION = 100;

module.exports = Explosion;
