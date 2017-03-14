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
	//Get main node from DOM
	let main = document.getElementsByTagName("main")[0];
	//create canvas and set canvas style
	let canvas = new Canvas(main,640,360);
	//Create stand.png sprite
	let sprite = new Sprite(canvas, './resources/images/sprites/stand.png', 481/7, 545/7);

	/* TEST ZONE */
	canvas.drawSprite(sprite,0,0);
};
