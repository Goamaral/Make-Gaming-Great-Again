'use strict'

class Canvas {
	constructor(root,width,height) {
		[ this.root,this.width,this.height ] = [ root,width,height ];
		//Creates canvas node
		this.canvas = document.createElement('canvas');
		this.canvas.height = this.height;
		this.canvas.width = this.width;
		//Set canvas custom default style
		this.setStyle({
			border: '1px solid black',
			margin: 'auto'
		});
		//Mounts canvas node to root node
		this.mountCanvas();
		//Define context
		this.ctx = this.canvas.getContext('2d');
	}

	//Returns current full canvas image data
	getImageData() {
		return this.ctx.getImageData(0,0,this.width,this.height);
	}

	//Recieves JS plain Object and updates convas style object
	setStyle(newStyle) {
		this.canvas.setStyle(newStyle);
	}

	//Draws image in the canvas
	drawImage(imgSrc,x,y,width,height) {
		let _img = new Image(width, height);
		_img.onload = () => {
			this.ctx.drawImage(_img,x,y,width,height);
		}
		_img.src = imgSrc;
	}

	//Draws sprite in the canvas
	drawSprite(sprite,x,y) {
		let _imgData = sprite.getImageData();
		//HERE
		this.ctx.putImageData(_imgData,x,y);
	}

	//Get current canvas height
	getHeight() {
		return this.canvas.clientHeight;
	}

	//Get current canvas width
	getWidth() {
		return this.canvas.clientWidth;
	}

	//Mount this.canvas node in the dom
	mountCanvas() {
		this.canvas = this.root.appendChild(this.canvas);
	}

	//Unmount canvas
	unmountCanvas() {
		this.root.removeChild(this.canvas);
	}
};
