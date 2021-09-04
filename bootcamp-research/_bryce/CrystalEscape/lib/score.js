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
