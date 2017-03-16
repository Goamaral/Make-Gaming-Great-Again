/*jshint esversion: 6 */

class Sprite {
	constructor(canvas, img, width, height) {
		//Convert constructor args as class properties
		[ this.canvas, this.img, this.width, this.height ] = [ canvas, img, width, height ];
		this.imgData = this.getImageData();
	}

	getImageData() {
		// If is running for the first time (by the constructor)
		if(this.imgData === undefined) {
			//Creates aux canvas and fetchs canvas data
			let [ canvasWidth, canvasHeight ] = [ this.canvas.getWidth(), this.canvas.getHeight() ];
			let _canvas = new Canvas(this.canvas.root, canvasWidth, canvasHeight);
			//_canvas.unmountCanvas();
			_canvas.drawImage(this.img, 0, 0, this.width, this.height);
			return _canvas.getFrameData();
		} else {
			// imgData already calculated, return imgData, this avoids unnecessary computing
			return this.imgData;
		}
	}
}

//export default Sprite;
