'use strict'

class Canvas {
	constructor(root) {
		//Creates canvas node
		let _canvas = document.createElement('canvas');
		//Mounts created canvas node in the dom and references it to this.canvas
		this.canvas = root.appendChild(_canvas);
		//Using flex in case we want to add out of canvas buttons
		this.setStyle({
			flex: '1'
		});
	}

	//Recieves JS plain Object and updates convas style object
	setStyle(newStyle) {
		let prevStyle = this.canvas.style;
		for(let key in newStyle) {
			prevStyle[key] = newStyle[key]
		};
	}

	//Get current canvas height
	getHeight() {
		return this.canvas.clientHeight;
	}

	//Get current canvas width
	getWidth() {
		return this.canvas.clientWidth;
	}
};
