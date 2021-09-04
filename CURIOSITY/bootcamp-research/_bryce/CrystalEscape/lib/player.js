const Ship = require('./ship');
const Util = require('./util');

class Player extends Ship {
	constructor(options) {
		super({
			path: Player.PATH,
			scale: Player.SCALE,
			spriteWidth: Player.SPRITE_WIDTH,
			spriteHeight: Player.SPRITE_HEIGHT,
			spriteMaxX: Player.SPRITE_MAX_X,
			spriteMaxY: Player.SPRITE_MAX_Y,
			pos: Player.STARTING_VARS.POS,
			vel: Player.STARTING_VARS.VEL,
			deceleration: Player.STARTING_VARS.DECELERATION,
			direction: Player.DIRECTION,
			...options
		});
		this.direction = 1;
		this.boostLevel = Player.STARTING_VARS.BOOST_LEVEL;
		this.topSpeed = Player.STARTING_VARS.TOP_SPEED;
		this.weaponLockout = Player.STARTING_VARS.WEAPON_LOCKOUT;
		this.bulletScale = Player.STARTING_VARS.BULLET_SCALE;
		this.bulletSpeed = Player.STARTING_VARS.BULLET_SPEED;
		this.powerupTimer = -1;
		this.activePowerups = [];

		this.addPowerup = this.addPowerup.bind(this);
		this.removePowerups = this.removePowerups.bind(this);
	}

	boost(direction) {
		switch (direction) {
			case 'up':
				this.vel[1] -= this.boostLevel;
				this.vel[1] = Math.max(this.vel[1], -1 * this.topSpeed);
				break;
			case 'down':
				this.vel[1] += this.boostLevel;
				this.vel[1] = Math.min(this.vel[1], this.topSpeed);
				break;
			case 'left':
				this.vel[0] -= this.boostLevel;
				this.vel[0] = Math.max(this.vel[0], -1 * this.topSpeed);
				break;
			case 'right':
				this.vel[0] += this.boostLevel;
				this.vel[0] = Math.min(this.vel[0], this.topSpeed);
				break;
			default:
				break;
		}
	}

	move() {
		//Restrict movement to window
		if (this.pos[0] < 0) {
			this.vel[0] = 0;
			this.pos[0] = 1;
		} else if (this.pos[0] > this.game.gameCanvas.width - this.width) {
			this.vel[0] = 0;
			this.pos[0] = this.game.gameCanvas.width - this.width - 1;
		}

		if (this.pos[1] < 0) {
			this.vel[1] = 0;
			this.pos[1] = 1;
		} else if (this.pos[1] > this.game.gameCanvas.height - this.height) {
			this.vel[1] = 0;
			this.pos[1] = this.game.gameCanvas.height - this.height - 1;
		}

		super.move();
	}

	draw(ctx) {
		// Countdown powerup timer and remove if necessary
		if (this.powerupTimer >= 0) this.powerupTimer--;
		if (this.powerupTimer === 0) this.removePowerups();

		// Display current powerups
		this.game.HUDCtx.fillStyle = 'white';
		this.game.HUDCtx.font = '14px Black Ops One';
		this.game.HUDCtx.fillText('Powerup Timer:', 1040, 180);
		this.game.HUDCtx.fillText('Active Powerups:', 1035, 250);
		this.game.HUDCtx.font = '12px Black Ops One';
		this.activePowerups.forEach((powerup, i) => {
			if (i < 9) {
				this.game.HUDCtx.fillText(powerup.type, 1050, 10 + 20 * (i + 13));
			} else if (i === 9) {
				if (this.powerupTimer % 60 < 10) {
					this.game.HUDCtx.fillStyle = 'red';
				} else if (this.powerupTimer % 60 < 20) {
					this.game.HUDCtx.fillStyle = 'orange';
				} else if (this.powerupTimer % 60 < 30) {
					this.game.HUDCtx.fillStyle = 'yellow';
				} else if (this.powerupTimer % 60 < 40) {
					this.game.HUDCtx.fillStyle = 'green';
				} else if (this.powerupTimer % 60 < 50) {
					this.game.HUDCtx.fillStyle = 'blue';
				} else if (this.powerupTimer % 60 < 60) {
					this.game.HUDCtx.fillStyle = 'purple';
				}
				this.game.HUDCtx.fillText('SO MANY POWERUPS!', 1035, 5 + 20 * (i + 13));
			}
		});

		this.game.HUDCtx.font = '22px Black Ops One';
		this.game.HUDCtx.strokeStyle = 'black';
		this.game.HUDCtx.fillStyle = 'white';
		if (this.activePowerups.length > 0) {
			if (this.powerupTimer < 100) {
				this.game.HUDCtx.fillStyle = 'red';
				this.game.HUDCtx.strokeText(this.powerupTimer / 100, 1070, 220);
			} else if (this.powerupTimer < 200) {
				this.game.HUDCtx.fillStyle = 'orange';
				this.game.HUDCtx.strokeText(this.powerupTimer / 100, 1070, 220);
			} else if (this.powerupTimer < 300) {
				this.game.HUDCtx.fillStyle = 'yellow';
				this.game.HUDCtx.strokeText(this.powerupTimer / 100, 1070, 220);
			}
			this.game.HUDCtx.fillText(this.powerupTimer / 100, 1070, 220);
		}
		super.draw(ctx);
	}

	addPowerup(powerup) {
		this.activePowerups.push(powerup);
		this.powerupTimer = Player.POWERUP_DURATION;
		switch (powerup.type) {
			case 'Bigger Bullets!':
				this.bulletScale *= 2;
				break;
			case 'Faster Bullets!':
				this.bulletSpeed *= 2;
				break;
			case 'So Agile!':
				this.boostLevel *= 2;
				break;
			case 'Reload Faster!':
				this.weaponLockout *= 0.5;
				this.game.gameCanvas.removeEventListener('keypress', this.game.throttledPress);
				this.game.throttledPress = Util.throttle(this.game.handleKeyPress, this.weaponLockout);
				this.game.gameCanvas.addEventListener('keypress', this.game.throttledPress);
				break;
		}
	}

	removePowerups() {
		this.activePowerups = [];
		this.bulletScale = Player.STARTING_VARS.BULLET_SCALE;
		this.bulletSpeed = Player.STARTING_VARS.BULLET_SPEED;
		this.boostLevel = Player.STARTING_VARS.BOOST_LEVEL;
		this.weaponLockout = Player.STARTING_VARS.WEAPON_LOCKOUT;
		this.game.gameCanvas.removeEventListener('keypress', this.game.throttledPress);
		this.game.throttledPress = Util.throttle(this.game.handleKeyPress, this.weaponLockout);
		this.game.gameCanvas.addEventListener('keypress', this.game.throttledPress);
	}
}

Player.PATH = './assets/images/sprites/ship.png';
Player.SPRITE_MAX_X = 2;
Player.SPRITE_MAX_Y = 7;
Player.SCALE = 2;
Player.SPRITE_WIDTH = 24;
Player.SPRITE_HEIGHT = 16;
Player.DIRECTION = 1;
Player.POWERUP_DURATION = 600;
Player.STARTING_VARS = {
	DECELERATION: 0.99,
	WEAPON_LOCKOUT: 600,
	BULLET_SCALE: 1,
	BULLET_SPEED: 4,
	TOP_SPEED: 6,
	BOOST_LEVEL: 1,
	POS: [10, 180],
	VEL: [0, 0]
};

module.exports = Player;
