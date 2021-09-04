const MovingObject = require('./moving_object');

class Bullet extends MovingObject {
	constructor(options) {
		super({ ...options, path: Bullet.PATH, spriteWidth: Bullet.SPRITE_WIDTH, spriteHeight: Bullet.SPRITE_HEIGHT });
	}
}

Bullet.PATH = './assets/images/sprites/bullet.png';
Bullet.SPRITE_HEIGHT = 8;
Bullet.SPRITE_WIDTH = 11;
Bullet.SCALE = 1;
Bullet.HEIGHT = Bullet.SPRITE_HEIGHT * Bullet.SCALE;
Bullet.WIDTH = Bullet.SPRITE_WIDTH * Bullet.SCALE;

module.exports = Bullet;
