'use strict'

class Canvas {
	constructor(root,width,height) {
		//Creates canvas node
		let _canvas = document.createElement('canvas');
		_canvas.height = height;
		_canvas.width = width;
		//Mounts created canvas node in the dom and references it to this.canvas
		this.canvas = root.appendChild(_canvas);
		//Define context
		this.ctx = this.canvas.getContext('2d');
	}

	//Recieves JS plain Object and updates convas style object
	setStyle(newStyle) {
		this.canvas.setStyle(newStyle);
	}

	drawImage(img,x,y,width,height) {
		console.log(img);
		this.ctx.drawImage(img,x,y,img.width,img.height);
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
