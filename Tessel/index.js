const Tessel = require('tessel-io');
const five = require('johnny-five');
const board = new five.Board({ io: new Tessel() });
const keypress = require('keypress');
const Rover = require('./Rover');

board.on('ready', () => {
	// 1. Instantiate the motors
	const motors = new five.Motors([
		{ pins: { dir: 'A4', pwm: 'A5' }, invertPWM: true },
		{ pins: { dir: 'B4', pwm: 'B5' }, invertPWM: true }
	]);

	// 2. Instantiate Rover. using Motors
	const rover = new Rover(motors);

	// 3. Configure `keypress` to generate events on keypresses in the REPL
	keypress(process.stdin);
	process.stdin.setEncoding('utf8');

	// 4. Listen for `keypress` events and invoke appropriate Rover methods
	process.stdin.on('keypress', function (ch, key) {
		if (!key) { return; }

		switch(key.name) {
			case 'q':
				rover.stop();
				console.log('Bye-bye!');
				process.exit();
				break;
			case 'up':
				rover.forward();
				break;
			case 'down':
				rover.backward();
				break;
			case 'left':
				rover.left();
				break;
			case 'right':
				rover.right();
				break;
			case 'space':
				rover.stop();
				break;
			default:
				return;
		}
	});
});
