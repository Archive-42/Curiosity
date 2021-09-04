const Ship = require('./ship');

class EnemyShip extends Ship {
	constructor(options) {
		super({
			deceleration: EnemyShip.DECELERATION,
			direction: EnemyShip.DIRECTION,
			...options
		});

		this.draw = this.draw.bind(this);
	}

	draw(ctx) {
		super.draw(ctx);
		if (this.framesDrawn % this.fireRate === 0) this.fire();
	}
}

EnemyShip.DIRECTION = -1;
EnemyShip.DECELERATION = 1;

module.exports = EnemyShip;
