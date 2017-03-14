'use strict'

class Sprite {
	constructor(canvas,imgSrc,width,height) {
		//Convert constructor args as class properties
		[ this.canvas,this.imgSrc,this.width,this.height ] = [ canvas,imgSrc,width,height ];
		this.imgData = this.getImageData();
	}

	//Creates aux canvas and fetchs canvas image data
	getImageData() {
		//If is running for the first time (by the constructor)
		if(this.imgData == undefined) {
			let [ canvasWidth, canvasHeight ] = [ this.canvas.getWidth(), this.canvas.getHeight() ];
			let _canvas = new Canvas(this.canvas.root,canvasWidth,canvasHeight);
			_canvas.drawImage(this.imgSrc,0,0,this.width,this.height)
			let _imgData = _canvas.getImageData();
			return _imgData;
		} else {
			//imgData already calculated, return imgData, this avoids unnecessary computing
			return this.imgData;
		}
	}
}
