'use strict'

window.onload = function() {
	let main = document.getElementsByTagName("main")[0];
	//Sets main to fill entire screen and take display as flex
	main.style='display: flex; width: 100%; height: 100%;';

	//create canvas and set canvas style
	let canvas = new Canvas(main);
	canvas.setStyle({
		border: '1px solid #000000',
		backgroundColor: 'yellow'
	});

};
