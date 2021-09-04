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
