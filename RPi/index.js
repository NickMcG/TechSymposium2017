const five = require('johnny-five');
const Raspi = require('raspi-io');
const board = new five.Board({
	io: new Raspi()
});

board.on('ready', () => {
	const sensor = new five.Multi({ controller: 'MPL3115A2' });
	const lcd = new five.LCD({
		pins: ['GPIO7', 'GPIO8', 'GPIO9', 'GPIO10', 'GPIO11', 'GPIO12'],
		backlight: 6,
		rows: 2,
		cols: 30
	});

	lcd.clear().print('Testing...');
	lcd.cursor(1, 0);
	lcd.print('1... 2... 3!');

	function printAltitude() {
		lcd.clear().print('Alt: ' + sensor.altimeter.feet);
	}

	function printEnvironment() {
		lcd.clear().print('Pressure: ' + sensor.barometer.pressure);
		lcd.cursor(1, 0);
		lcd.print('Temp: ' + sensor.thermometer.F);
	}

	board.repl.inject({
		lcd: lcd,
		printAlt: printAltitude,
		printEnv: printEnvironment
	});
});