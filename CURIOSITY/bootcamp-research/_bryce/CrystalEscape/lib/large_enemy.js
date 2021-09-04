const EnemyShip = require('./enemy_ship');

class LargeEnemy extends EnemyShip {
	constructor(options) {
		super({
			path: LargeEnemy.PATH,
			scale: LargeEnemy.SCALE,
			spriteWidth: LargeEnemy.SPRITE_WIDTH,
			spriteHeight: LargeEnemy.SPRITE_HEIGHT,
			spriteMaxX: LargeEnemy.SPRITE_MAX_X,
			spriteMaxY: LargeEnemy.SPRITE_MAX_Y,
			vel: LargeEnemy.STARTING_VARS.VEL,
			...options
		});
		this.topSpeed = LargeEnemy.STARTING_VARS.TOP_SPEED;
		this.fireRate = LargeEnemy.STARTING_VARS.FIRE_RATE;
		this.bulletScale = LargeEnemy.STARTING_VARS.BULLET_SCALE;
		this.bulletSpeed = LargeEnemy.STARTING_VARS.BULLET_SPEED;
		this.basePoints = LargeEnemy.STARTING_VARS.BASE_POINTS;
	}
}

LargeEnemy.PATH = './assets/images/sprites/enemy-large.png';
LargeEnemy.SPRITE_MAX_X = 1;
LargeEnemy.SPRITE_MAX_Y = 2;
LargeEnemy.SCALE = 2;
LargeEnemy.SPRITE_WIDTH = 32;
LargeEnemy.SPRITE_HEIGHT = 32;
LargeEnemy.WIDTH = LargeEnemy.SPRITE_WIDTH * LargeEnemy.SCALE;
LargeEnemy.HEIGHT = LargeEnemy.SPRITE_HEIGHT * LargeEnemy.SCALE;
LargeEnemy.STARTING_VARS = {
	TOP_SPEED: 6,
	VEL: [-0.5, 0],
	FIRE_RATE: 300,
	BULLET_SCALE: 4,
	BULLET_SPEED: 2,
	BASE_POINTS: 500
};

module.exports = LargeEnemy;
