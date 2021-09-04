const EnemyShip = require('./enemy_ship');

class SmallEnemy extends EnemyShip {
	constructor(options) {
		super({
			path: SmallEnemy.PATH,
			scale: SmallEnemy.SCALE,
			spriteWidth: SmallEnemy.SPRITE_WIDTH,
			spriteHeight: SmallEnemy.SPRITE_HEIGHT,
			spriteMaxX: SmallEnemy.SPRITE_MAX_X,
			spriteMaxY: SmallEnemy.SPRITE_MAX_Y,
			vel: SmallEnemy.STARTING_VARS.VEL,
			...options
		});
		this.topSpeed = SmallEnemy.STARTING_VARS.TOP_SPEED;
		this.fireRate = SmallEnemy.STARTING_VARS.FIRE_RATE;
		this.bulletScale = SmallEnemy.STARTING_VARS.BULLET_SCALE;
		this.bulletSpeed = SmallEnemy.STARTING_VARS.BULLET_SPEED;
		this.basePoints = SmallEnemy.STARTING_VARS.BASE_POINTS;
	}
}

SmallEnemy.PATH = './assets/images/sprites/enemy-small.png';
SmallEnemy.SPRITE_MAX_X = 1;
SmallEnemy.SPRITE_MAX_Y = 2;
SmallEnemy.SCALE = 2;
SmallEnemy.SPRITE_WIDTH = 16;
SmallEnemy.SPRITE_HEIGHT = 16;
SmallEnemy.WIDTH = SmallEnemy.SPRITE_WIDTH * SmallEnemy.SCALE;
SmallEnemy.HEIGHT = SmallEnemy.SPRITE_HEIGHT * SmallEnemy.SCALE;
SmallEnemy.STARTING_VARS = {
	TOP_SPEED: 6,
	VEL: [-1, 0],
	FIRE_RATE: 100,
	BULLET_SCALE: 1,
	BULLET_SPEED: 4,
	BASE_POINTS: 100
};

module.exports = SmallEnemy;
