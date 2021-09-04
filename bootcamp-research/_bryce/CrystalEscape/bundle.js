/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/crystal_escape.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/background.js":
/*!***************************!*\
  !*** ./lib/background.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

class Background {
	constructor({ ctx, type, level = 1 }) {
		this.ctx = ctx;
		if (type === 'background') {
			this.path = `./assets/images/backgrounds/level_${level % 5}/background.png`;
			this.scrollSpeed = 1 + level * 0.1;
		} else {
			this.path = `./assets/images/backgrounds/level_${level % 5}/midground.png`;
			this.scrollSpeed = 2 + level * 0.2;
		}
		this.x = 0;
		this.y = 0;
		this.img = new Image();
		this.img.src = this.path;
		this.img.onload = () => {
			this.scale = this.ctx.canvas.height / this.img.naturalHeight;
		};

		this.draw = this.draw.bind(this);
	}

	draw() {
		if (this.img.naturalWidth > 0) {
			this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
			let i = 0;
			while (this.x + this.img.naturalWidth * this.scale * i < this.ctx.canvas.width) {
				this.ctx.drawImage(
					this.img,
					0,
					0,
					this.img.naturalWidth,
					this.img.naturalHeight,
					this.x + this.img.naturalWidth * this.scale * i,
					0,
					this.img.naturalWidth * this.scale,
					this.img.naturalHeight * this.scale
				);
				i++;
			}
			if (this.x <= -this.img.naturalWidth * this.scale) {
				this.x = 0;
			}
			this.x -= this.scrollSpeed;
		}
	}
}

module.exports = Background;


/***/ }),

/***/ "./lib/bullet.js":
/*!***********************!*\
  !*** ./lib/bullet.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(/*! ./moving_object */ "./lib/moving_object.js");

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


/***/ }),

/***/ "./lib/crystal.js":
/*!************************!*\
  !*** ./lib/crystal.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(/*! ./moving_object */ "./lib/moving_object.js");

class Crystal extends MovingObject {
	constructor(options) {
		console.log('New Crystal');
		super({
			path: Crystal.PATH,
			scale: Crystal.SCALE,
			spriteWidth: Crystal.SPRITE_WIDTH,
			spriteHeight: Crystal.SPRITE_HEIGHT,
			spriteMaxX: Crystal.SPRITE_MAX_X,
			spriteMaxY: Crystal.SPRITE_MAX_Y,
			vel: [Math.random() * Crystal.TOP_SPEED, Math.random() * Crystal.TOP_SPEED],
			pos: [
				options.game.gameCanvas.width - Crystal.WIDTH * 2,
				Math.floor(Math.random() * (options.game.gameCanvas.height - Crystal.HEIGHT + 1))
			],
			...options
		});
	}

	move() {
		//Restrict movement to window and bounce off edges
		if (this.pos[0] < 0) {
			this.vel[0] *= -1;
			this.pos[0] = 1;
		} else if (this.pos[0] > this.game.gameCanvas.width - this.width) {
			this.vel[0] *= -1;
			this.pos[0] = this.game.gameCanvas.width - this.width - 1;
		}

		if (this.pos[1] < 0) {
			this.vel[1] *= -1;
			this.pos[1] = 1;
		} else if (this.pos[1] > this.game.gameCanvas.height - this.height) {
			this.vel[1] *= -1;
			this.pos[1] = this.game.gameCanvas.height - this.height - 1;
		}

		super.move();
	}
}

Crystal.PATH = './assets/images/sprites/crystal.png';
Crystal.SPRITE_MAX_X = 4;
Crystal.SPRITE_MAX_Y = 1;
Crystal.SCALE = 2;
Crystal.SPRITE_WIDTH = 10;
Crystal.SPRITE_HEIGHT = 24;
Crystal.WIDTH = Crystal.SPRITE_WIDTH * Crystal.SCALE;
Crystal.HEIGHT = Crystal.SPRITE_HEIGHT * Crystal.SCALE;
Crystal.TOP_SPEED = 4;

module.exports = Crystal;


/***/ }),

/***/ "./lib/crystal_escape.js":
/*!*******************************!*\
  !*** ./lib/crystal_escape.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(/*! ./game */ "./lib/game.js");

document.addEventListener('DOMContentLoaded', () => {
	const backgroundCanvas = document.getElementById('background-canvas');
	const backgroundCtx = backgroundCanvas.getContext('2d');

	const midgroundCanvas = document.getElementById('midground-canvas');
	const midgroundCtx = midgroundCanvas.getContext('2d');

	const gameCanvas = document.getElementById('game-canvas');
	const gameCtx = gameCanvas.getContext('2d');

	const HUDCanvas = document.getElementById('hud-frame-canvas');
	const HUDCtx = HUDCanvas.getContext('2d');

	const game = new Game({ gameCanvas, gameCtx, midgroundCtx, backgroundCtx, HUDCtx });
	game.step();
});


/***/ }),

/***/ "./lib/enemy_ship.js":
/*!***************************!*\
  !*** ./lib/enemy_ship.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Ship = __webpack_require__(/*! ./ship */ "./lib/ship.js");

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


/***/ }),

/***/ "./lib/explosion.js":
/*!**************************!*\
  !*** ./lib/explosion.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const StaticObject = __webpack_require__(/*! ./static_object */ "./lib/static_object.js");

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


/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Background = __webpack_require__(/*! ./background */ "./lib/background.js");
const Ship = __webpack_require__(/*! ./ship */ "./lib/ship.js");
const Bullet = __webpack_require__(/*! ./bullet */ "./lib/bullet.js");
const Player = __webpack_require__(/*! ./player */ "./lib/player.js");
const EnemyShip = __webpack_require__(/*! ./enemy_ship */ "./lib/enemy_ship.js");
const SmallEnemy = __webpack_require__(/*! ./small_enemy */ "./lib/small_enemy.js");
const MediumEnemy = __webpack_require__(/*! ./medium_enemy */ "./lib/medium_enemy.js");
const LargeEnemy = __webpack_require__(/*! ./large_enemy */ "./lib/large_enemy.js");
const Explosion = __webpack_require__(/*! ./explosion */ "./lib/explosion.js");
const Powerup = __webpack_require__(/*! ./powerup */ "./lib/powerup.js");
const Crystal = __webpack_require__(/*! ./crystal */ "./lib/crystal.js");
const Score = __webpack_require__(/*! ./score */ "./lib/score.js");
const Util = __webpack_require__(/*! ./util */ "./lib/util.js");

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


/***/ }),

/***/ "./lib/large_enemy.js":
/*!****************************!*\
  !*** ./lib/large_enemy.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const EnemyShip = __webpack_require__(/*! ./enemy_ship */ "./lib/enemy_ship.js");

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


/***/ }),

/***/ "./lib/medium_enemy.js":
/*!*****************************!*\
  !*** ./lib/medium_enemy.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const EnemyShip = __webpack_require__(/*! ./enemy_ship */ "./lib/enemy_ship.js");

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


/***/ }),

/***/ "./lib/moving_object.js":
/*!******************************!*\
  !*** ./lib/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const StaticObject = __webpack_require__(/*! ./static_object */ "./lib/static_object.js");

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


/***/ }),

/***/ "./lib/player.js":
/*!***********************!*\
  !*** ./lib/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Ship = __webpack_require__(/*! ./ship */ "./lib/ship.js");
const Util = __webpack_require__(/*! ./util */ "./lib/util.js");

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


/***/ }),

/***/ "./lib/powerup.js":
/*!************************!*\
  !*** ./lib/powerup.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const StaticObject = __webpack_require__(/*! ./static_object */ "./lib/static_object.js");

class Powerup extends StaticObject {
	constructor(options) {
		super({
			path: Powerup.PATH,
			scale: Powerup.SCALE,
			spriteWidth: Powerup.SPRITE_WIDTH,
			spriteHeight: Powerup.SPRITE_HEIGHT,
			spriteMaxX: Powerup.SPRITE_MAX_X,
			spriteMaxY: Powerup.SPRITE_MAX_Y,
			spriteYOffset: Powerup.SPRITE_HEIGHT * options.index,
			...options
		});

		switch (options.index) {
			case 0:
				this.type = 'Bigger Bullets!';
				break;
			case 1:
				this.type = 'Faster Bullets!';
				break;
			case 2:
				this.type = 'So Agile!';
				break;
			case 3:
				this.type = 'Reload Faster!';
				break;
		}

		this.draw = this.draw.bind(this);
	}

	draw(ctx) {
		super.draw(ctx);
		if (this.framesDrawn > Powerup.DURATION) this.remove();
	}
}

Powerup.PATH = './assets/images/sprites/power-up.png';
Powerup.SPRITE_MAX_X = 2;
Powerup.SPRITE_MAX_Y = 1;
Powerup.SCALE = 1;
Powerup.SPRITE_WIDTH = 16;
Powerup.SPRITE_HEIGHT = 16;
Powerup.WIDTH = Powerup.SPRITE_WIDTH * Powerup.SCALE;
Powerup.HEIGHT = Powerup.SPRITE_HEIGHT * Powerup.SCALE;
Powerup.DURATION = 600;

module.exports = Powerup;


/***/ }),

/***/ "./lib/score.js":
/*!**********************!*\
  !*** ./lib/score.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

class Score {
	constructor({ game }) {
		this.currentScore = 0;
		this.framesDrawn = 0;
		this.multiplier = 1;
		this.game = game;
	}

	draw(ctx) {
		ctx.font = '18px Black Ops One';
		ctx.fillStyle = 'white';
		ctx.fillText('SCORE:', 40, 180);
		ctx.fillText(this.currentScore, 40, 210);
		ctx.fillText('LEVEL:', 40, 260);
		ctx.fillText(this.game.level, 40, 290);

		this.framesDrawn++;
		if (this.framesDrawn % 10 === 0) this.currentScore += this.multiplier;
		this.currentScore = Math.floor(this.currentScore);
	}

	addPoints(basePoints) {
		this.currentScore += basePoints * this.multiplier;
	}
}

module.exports = Score;


/***/ }),

/***/ "./lib/ship.js":
/*!*********************!*\
  !*** ./lib/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(/*! ./moving_object */ "./lib/moving_object.js");
const Bullet = __webpack_require__(/*! ./bullet */ "./lib/bullet.js");

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


/***/ }),

/***/ "./lib/small_enemy.js":
/*!****************************!*\
  !*** ./lib/small_enemy.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const EnemyShip = __webpack_require__(/*! ./enemy_ship */ "./lib/enemy_ship.js");

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


/***/ }),

/***/ "./lib/static_object.js":
/*!******************************!*\
  !*** ./lib/static_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

class StaticObject {
	constructor({
		pos,
		path,
		scale = 1,
		spriteXOffset = 0,
		spriteYOffset = 0,
		spriteWidth,
		spriteHeight,
		game,
		spriteMaxX = 1,
		spriteMaxY = 1
	}) {
		this.pos = pos;
		this.spriteXOffset = spriteXOffset;
		this.spriteYOffset = spriteYOffset;
		this.spriteWidth = spriteWidth;
		this.spriteHeight = spriteHeight;
		this.img = new Image();
		this.img.src = path;
		this.spriteIndex = { x: 0, y: 0, maxX: spriteMaxX, maxY: spriteMaxY };
		this.scale = scale;
		this.width = this.spriteWidth * this.scale;
		this.height = this.spriteHeight * this.scale;
		this.game = game;
		this.framesDrawn = 0;
	}

	draw(ctx) {
		if (this.img.naturalWidth > 0) {
			ctx.drawImage(
				this.img,
				this.spriteXOffset + this.spriteIndex.x * this.spriteWidth,
				this.spriteYOffset + this.spriteIndex.y * this.spriteHeight,
				this.spriteWidth,
				this.spriteHeight,
				this.pos[0],
				this.pos[1],
				this.width,
				this.height
			);

			if (this.framesDrawn % 10 === 0) {
				this.spriteIndex.x++;
				this.spriteIndex.x = this.spriteIndex.x % this.spriteIndex.maxX;
				this.spriteIndex.y++;
				this.spriteIndex.y = this.spriteIndex.y % this.spriteIndex.maxY;
			}

			this.framesDrawn++;
		}
	}

	xBounds() {
		return [this.pos[0], this.pos[0] + this.width];
	}

	yBounds() {
		return [this.pos[1], this.pos[1] + this.height];
	}

	isCollidedWith(otherObject) {
		return !(
			this.xBounds()[0] > otherObject.xBounds()[1] ||
			this.xBounds()[1] < otherObject.xBounds()[0] ||
			this.yBounds()[0] > otherObject.yBounds()[1] ||
			this.yBounds()[1] < otherObject.yBounds()[0]
		);
	}

	remove() {
		this.game.remove(this);
	}
}

module.exports = StaticObject;


/***/ }),

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

const Util = {
	throttle: (func, limit) => {
		let throttled;
		return (...args) => {
			if (!throttled) {
				func(...args);
				throttled = true;
				setTimeout(() => (throttled = false), limit);
			}
		};
	}
};

module.exports = Util;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map