const Background = require('./background');
const Ship = require('./ship');
const Bullet = require('./bullet');
const Player = require('./player');
const EnemyShip = require('./enemy_ship');
const SmallEnemy = require('./small_enemy');
const MediumEnemy = require('./medium_enemy');
const LargeEnemy = require('./large_enemy');
const Explosion = require('./explosion');
const Powerup = require('./powerup');
const Crystal = require('./crystal');
const Score = require('./score');
const Util = require('./util');

class Game {
	constructor({ gameCanvas, gameCtx, midgroundCtx, backgroundCtx, HUDCtx }) {
		this.gameCanvas = gameCanvas;
		this.ctx = gameCtx;
		this.paused = true;

		this.midgroundCtx = midgroundCtx;
		this.backgroundCtx = backgroundCtx;

		this.HUDCtx = HUDCtx;

		this.frameIndex = 1;
		this.spawnRateFrames = 300;
		this.minSpawnRateFrames = 50;
		this.spawnChance = 0.6;
		this.powerUpDropChance = 1;

		this.enemies = [];
		this.bullets = [];
		this.explosions = [];
		this.powerups = [];
		this.crystals = [];

		this.level = 1;
		this.score = new Score({ game: this });
		this.player = new Player({ game: this });
		this.generateBackground();

		this.step = this.step.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);

		this.gameCanvas.focus();

		this.gameCanvas.addEventListener('keydown', this.handleKeyDown);
		this.throttledPress = Util.throttle(this.handleKeyPress, this.player.weaponLockout);
		this.gameCanvas.addEventListener('keypress', this.throttledPress);

		this.pauseGradient = this.ctx.createRadialGradient(400, 200, 60, 400, 200, 400);
		this.pauseGradient.addColorStop(0, '#35fffd');
		this.pauseGradient.addColorStop(1, '#048aac');
	}

	generateBackground() {
		this.background = new Background({ ctx: this.backgroundCtx, type: 'background', level: this.level });
		this.midground = new Background({ ctx: this.midgroundCtx, type: 'midground', level: this.level });
	}

	handleKeyDown(e) {
		if (e.code === 'KeyW' || e.code === 'ArrowUp') {
			this.player.boost('up');
		} else if (e.code === 'KeyS' || e.code === 'ArrowDown') {
			this.player.boost('down');
		} else if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
			this.player.boost('left');
		} else if (e.code === 'KeyD' || e.code === 'ArrowRight') {
			this.player.boost('right');
		} else if (e.code === 'Enter' || (e.code === 'Space' && this.paused)) {
			this.paused = !this.paused;
		}
	}

	handleKeyPress(e) {
		if (e.code === 'Space') this.player.fire();
	}

	allObjects() {
		return this.allMovingObjects().concat(...this.explosions, ...this.powerups);
	}

	allMovingObjects() {
		return [].concat(this.player, ...this.bullets, ...this.enemies, ...this.crystals);
	}

	add(obj) {
		if (obj instanceof Bullet) {
			this.bullets.push(obj);
		} else if (obj instanceof EnemyShip) {
			this.enemies.push(obj);
		} else if (obj instanceof Explosion) {
			this.explosions.push(obj);
		} else if (obj instanceof Powerup) {
			this.powerups.push(obj);
		} else if (obj instanceof Crystal) {
			this.crystals.push(obj);
		}
	}

	remove(obj) {
		if (obj instanceof Bullet) {
			this.bullets = this.bullets.filter(bullet => bullet != obj);
		} else if (obj instanceof EnemyShip) {
			this.enemies = this.enemies.filter(enemy => enemy != obj);
			this.score.addPoints(obj.basePoints);
			this.add(new Explosion({ pos: obj.pos, game: this }));
		} else if (obj instanceof Explosion) {
			this.explosions = this.explosions.filter(explosion => explosion != obj);
			if (Math.random() < this.powerUpDropChance)
				this.add(new Powerup({ pos: obj.pos, game: this, index: Math.floor(Math.random() * 4) }));
		} else if (obj instanceof Powerup) {
			this.powerups = this.powerups.filter(powerup => powerup != obj);
		} else if (obj instanceof Crystal) {
			this.crystals = [];
		} else if (obj instanceof Player) {
			alert(`You died :( Score: ${this.score.currentScore}`);
			this.reset();
		}
	}

	step() {
		requestAnimationFrame(this.step);
		if (!this.paused) {
			this.HUDCtx.clearRect(0, 0, this.HUDCtx.canvas.width, this.HUDCtx.canvas.height);
			this.ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
			this.allMovingObjects().forEach(obj => obj.move());
			this.checkCollisions();
			this.background.draw();
			this.midground.draw();
			this.score.draw(this.HUDCtx);
			this.allObjects().forEach(obj => obj.draw(this.ctx));

			// Perform roll to spawn enemy after appropriate number of frames have passed
			if (this.frameIndex % this.spawnRateFrames === 0 && Math.random() < this.spawnChance) {
				this.spawnEnemy();
			}

			// Spawn a crystal after player attains score threshold for the current level
			if (this.crystals.length === 0 && this.score.currentScore > Math.pow(this.level, 2) * 1000) {
				this.add(new Crystal({ game: this }));
			}

			this.frameIndex++;
		} else {
			this.ctx.fillStyle = this.pauseGradient;
			this.ctx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
			this.ctx.font = '20px Black Ops One';
			this.ctx.fillStyle = 'white';
			this.ctx.fillText('Game Paused', 330, 100);
			this.ctx.fillText('Press Enter or Space to Start', 230, 150);
			this.ctx.font = '18px Black Ops One';
			this.ctx.fillText('Use WASD or Arrow keys to move', 230, 250);
			this.ctx.fillText('Press or hold Space to fire', 260, 280);
			this.ctx.fillText('Collect powerups from destroyed ships', 205, 310);
			this.ctx.fillText('Score points, pick up the crystal, and advance to the next level!', 90, 340);
		}
	}

	spawnEnemy() {
		let enemy;
		const rand = Math.random();
		if (rand < 0.5) {
			const pos = [this.gameCanvas.width, Math.floor(Math.random() * (this.gameCanvas.height - SmallEnemy.HEIGHT + 1))];
			enemy = new SmallEnemy({ game: this, pos });
		} else if (rand < 0.8) {
			const pos = [
				this.gameCanvas.width,
				Math.floor(Math.random() * (this.gameCanvas.height - MediumEnemy.HEIGHT + 1))
			];
			enemy = new MediumEnemy({ game: this, pos });
		} else {
			const pos = [this.gameCanvas.width, Math.floor(Math.random() * (this.gameCanvas.height - LargeEnemy.HEIGHT + 1))];
			enemy = new LargeEnemy({ game: this, pos });
		}
		console.log('Spawning', enemy);
		this.add(enemy);
	}

	checkCollisions() {
		this.allObjects().forEach((obj1, startIdx) => {
			this.allObjects()
				.slice(startIdx + 1) //Prevent checking multiple times
				.forEach(obj2 => {
					if (obj1.isCollidedWith(obj2) && obj1.direction === -1 * obj2.direction) {
						obj2.remove();
						obj1.remove();
					} else if (obj1.isCollidedWith(obj2) && obj1 instanceof Player && obj2 instanceof Powerup) {
						this.player.addPowerup(obj2);
						obj2.remove();
					} else if (obj1.isCollidedWith(obj2) && obj1 instanceof Player && obj2 instanceof Crystal) {
						this.levelUp();
						obj2.remove();
					}
				});
		});
	}

	// Clear enemies, bullets, and explosions. Reset score to 0 and level and multiplier to 1. Generate level 1 backgrounds.
	reset() {
		this.paused = true;
		this.enemies = [];
		this.bullets = [];
		this.explosions = [];
		this.powerups = [];
		this.crystals = [];
		this.score.currentScore = 0;
		this.score.multiplier = 1;
		this.spawnChance = 0.6;
		this.spawnRateFrames = 300;
		this.frameIndex = 1;
		this.level = 1;
		this.player.removePowerups();
		this.generateBackground();
	}

	levelUp() {
		this.level++;
		this.score.multiplier += 0.5;
		this.spawnChance = Math.min(this.spawnChance * 1.1, 1);
		this.spawnRateFrames = Math.max(Math.floor(this.spawnRateFrames * 0.9), this.minSpawnRateFrames);
		this.generateBackground();
	}
}

module.exports = Game;
