const StaticObject = require('./static_object');

class MovingObject extends StaticObject {
	constructor(options) {
		super(options);
		this.deceleration = options.deceleration || 1;
		this.direction = options.direction;
		this.vel = options.vel;
		this.speedMultiplier = options.speedMultiplier || 1;
	}

	move() {
		this.pos[0] += this.vel[0] * this.speedMultiplier;
		this.pos[1] += this.vel[1] * this.speedMultiplier;

		this.vel[0] *= this.deceleration;
		this.vel[1] *= this.deceleration;

		if (this.pos[0] < -1 * this.width || this.pos[0] > this.game.gameCanvas.width) this.remove();
	}
}

module.exports = MovingObject;
