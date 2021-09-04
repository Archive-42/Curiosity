const EnemyShip = require('./enemy_ship');

class MediumEnemy extends EnemyShip {
	constructor(options) {
		super({
			path: MediumEnemy.PATH,
			scale: MediumEnemy.SCALE,
			spriteWidth: MediumEnemy.SPRITE_WIDTH,
			spriteHeight: MediumEnemy.SPRITE_HEIGHT,
			spriteMaxX: MediumEnemy.SPRITE_MAX_X,
			spriteMaxY: MediumEnemy.SPRITE_MAX_Y,
			vel: MediumEnemy.STARTING_VARS.VEL,
			...options
		});
		this.topSpeed = MediumEnemy.STARTING_VARS.TOP_SPEED;
		this.fireRate = MediumEnemy.STARTING_VARS.FIRE_RATE;
		this.bulletScale = MediumEnemy.STARTING_VARS.BULLET_SCALE;
		this.bulletSpeed = MediumEnemy.STARTING_VARS.BULLET_SPEED;
		this.basePoints = MediumEnemy.STARTING_VARS.BASE_POINTS;
	}
}

MediumEnemy.PATH = './assets/images/sprites/enemy-medium.png';
MediumEnemy.SPRITE_MAX_X = 1;
MediumEnemy.SPRITE_MAX_Y = 2;
MediumEnemy.SCALE = 2;
MediumEnemy.SPRITE_WIDTH = 16;
MediumEnemy.SPRITE_HEIGHT = 32;
MediumEnemy.WIDTH = MediumEnemy.SPRITE_WIDTH * MediumEnemy.SCALE;
MediumEnemy.HEIGHT = MediumEnemy.SPRITE_HEIGHT * MediumEnemy.SCALE;
MediumEnemy.STARTING_VARS = {
	TOP_SPEED: 6,
	VEL: [-0.8, 0],
	FIRE_RATE: 150,
	BULLET_SCALE: 1.5,
	BULLET_SPEED: 3,
	BASE_POINTS: 250
};

module.exports = MediumEnemy;
