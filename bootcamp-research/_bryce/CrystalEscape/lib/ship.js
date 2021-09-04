const MovingObject = require('./moving_object');
const Bullet = require('./bullet');

class Ship extends MovingObject {
	constructor(options) {
		super(options);
	}

	fire() {
		const pos = this.pos.slice();
		pos[0] = this.direction > 0 ? pos[0] + this.width : pos[0] - Bullet.SPRITE_WIDTH * this.bulletScale - 1;
		pos[1] += (this.height - Bullet.SPRITE_HEIGHT * this.bulletScale) / 2;
		const vel = [Math.max(this.vel.slice()[0], 0) + this.direction * this.bulletSpeed, 0];
		const bullet = new Bullet({ pos, vel, game: this.game, scale: this.bulletScale, direction: this.direction });

		this.game.add(bullet);
	}
}

module.exports = Ship;
