'use strict'
//NOTE: When arrow functions are used in global scope, they always refer to the global this, window. For safety always use ES5 anonymous function calls in global scope.
//NOTE: Auxiliar variables should hava a _ before their proper name, for example, _auxVar instead of auxVar
//TODO: Make game responsive


//Update style prop object from given object
Object.prototype.setStyle = function(newStyle) {
	let prevStyle = this.style;
	if(this.style!=undefined) {
		for(let key in newStyle) {
			prevStyle[key] = newStyle[key];
		}
	}
}

//On window full load
this.onload = function() {
	let main = document.getElementsByTagName("main")[0];

	//create canvas and set canvas style
	let canvas = new Canvas(main,640,360);
	canvas.setStyle({
		border: '1px solid #000000',
		margin: 'auto'
	});

	//Load stand.png and draw it in the canvas left down corner
	let _img = new Image(481/7,545/7);
	_img.onload = () => {
		canvas.drawImage(_img,0,canvas.getHeight()-_img.height,_img.width,_img.height);
	}
	_img.src = './resources/images/sprites/stand.png';
};
