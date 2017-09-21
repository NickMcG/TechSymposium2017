const five = require('johnny-five');
const Raspi = require('raspi-io');
const board = new five.Board({
	io: new Raspi()
});

board.on('ready', () => {
	const sensor = new five.Multi({ controller: 'MPL3115A2' });
	const lcd = new five.LCD({
		pins: [7, 8, 9, 10, 11, 12],
		backlight: 6,
		rows: 2,
		cols: 30
	});

	lcd.clear().print("Testing...");
	lcd.cursor(1, 0);
	lcd.print("1... 2... 3!");

	sensor.on('change', () => {
		console.log('------');
		console.log('Altitude: ', sensor.altimeter.feet);
		console.log('Pressure: ', sensor.barometer.pressure);
		console.log('Temperature: ', sensor.thermometer.F);
		console.log('------');
	});
});