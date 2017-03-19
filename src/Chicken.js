const Bird = require('./Bird');

module.exports = class Chicken extends Bird {
	sing() {
		console.log('Cluck');
	}

	setHeight(height) {
		throw new Error('I can\'t fly');
	}
}