const Location = require('./Location');
const Chicken = require('./Chicken');

module.exports = class GameField {
	constructor(width, height, depth, fieldSize) {
		this.width = width;
		this.height = height;
		this.depth = depth;
		this.fieldSize = fieldSize;
		this.birds = [];
		this.gameStarted = false;
	}

	addBird(bird) {
		this.birds.push(bird);
	}

	//Start the game
	startGame(pm) {
		try {
			this.placeBirds(pm);
			this.gameStarted = (this.birds.length > 0 && this.isGameFieldValid());
		} catch (err) {
			this.gameStarted = false;
			console.log(err);
		}
		return this.gameStarted;
	}

	//Shot to a bird
	shot(x, y, h) {
		let hit = false;
		if (this.gameStarted) {
			for (var i = 0; i < this.birds.length; i++) {
				var bird = this.birds[i];
				var height = bird.getHeight();
				var location = bird.getLocation();
				hit = location.x == x && location.y == y && height == h;
				if (hit) {
					bird.sing();
					break;
				}
			}
		}
		return hit;
	}

	//Place the birds on the fields
	placeBirds(type) {
		//Random Distribution
		if (type == 'RANDOM') {
			for (var i = 0; i < this.birds.length; i++) {
				var bird = this.birds[i];
				let location = new Location(this.getRandomInt(this.width), this.getRandomInt(this.height));
				bird.setLocation(location);
				if (!(bird instanceof Chicken)) {
					bird.setHeight(this.getRandomInt(this.depth));
				}
			}
		}
		//Custom Distribution
		else if (type == 'CUSTOM') {

		}
	}

	//Check if the GameField is Valid
	isGameFieldValid() {
		let self = this;
		let isValid = true;
		this.birds.forEach(function(bird) {
			let h = bird.getHeight();
			let location = bird.getLocation();
			let x = location.x;
			let y = location.y;
			isValid = self.fieldSize.isWithinField(h, x, y);
			if (!isValid) {
				return;
			}
		});
		return isValid;
	}

	//Generate random int between 0 and max
	getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}
}