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
