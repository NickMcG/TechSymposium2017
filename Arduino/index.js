const five = require('johnny-five');
const board = new five.Board();

board.on('ready', () => {
	const buzzer = new five.Piezo(6);

	function playSong() {
		buzzer.play({
			tempo: 120,
			song: [
				['e5', 1],
				['g#5', 1],
				['f#5', 1],
				['b4', 2],
				['e5', 1],
				['f#5', 1],
				['g#5', 1],
				['e5', 2],
				['g#5', 1],
				['e5', 1],
				['f#5', 1],
				['b4', 2],
				['b4', 1],
				['f#5', 1],
				['g#5', 1],
				['e5', 2]
			]
		});
	}

	board.repl.inject({
		playSong: playSong
	});
});