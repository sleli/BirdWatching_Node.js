const Bird = require('./Bird');

module.exports = class Duck extends Bird {
	sing() {
		console.log('Squawk');
	}
}