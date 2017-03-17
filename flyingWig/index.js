"use strict";

/*jshint esversion: 6 */

//import Canvas from 'Canvas';
//import Sprite from 'Sprite';

// NOTE: When arrow functions are used in global scope, they always refer to the global this, window. For safety always use ES5 anonymous function calls in global scope.
// NOTE: Auxiliar variables should hava a _ before their proper name, for example, _auxVar instead of auxVar
// TODO: Make game responsive
// TODO: use natural dim instead of fixed ones

// On window full load
this.onload = () => {
	//Get main node from DOM
	let main = document.getElementsByTagName("main")[0];
	//Load sprites
	let spritesPath = './resources/images/sprites/';
	// Sprite names
	let spriteNames = [ 'stand','jump','slide','anim1','anim2','anim3' ];
	// Create auxiliary tag to listen to events
	let listener = document.createElement('listener');
	// Load every sprite and create a image node for each one
	let spriteNodes = createSpriteNodes(spriteNames, spritesPath, listener);
	// Waits for even spritesLoaded to be triggered
	listener.addEventListener('spritesLoaded', spritesLoadedHandler);

	function spritesLoadedHandler() {
		listener.removeEventListener('spritesLoaded', spritesLoadedHandler);
		spriteNodesToSpriteObjects(main,spriteNodes,listener);
	}
}

// Load every sprite and create a image node for each one
function createSpriteNodes(spriteNames, spritesPath, listener) {
	let out = [];
	let count = 0;

	// Create nodes
	for (let ind in spriteNames) {
		let spriteName = spriteNames[ind];
		//NOT RESPONSIVE
		let node = new Image();
		node.onload = onloadHandler;
		node.src = spritesPath + spriteName + '.png';
		out.push(node);
	}

	return out;

	function onloadHandler(ev) {
		let targ = ev.target;
		targ.height = targ.naturalHeight;
		targ.width = targ.naturalWidth;
		++count;
		if(count == spriteNames.length) {
			let spritesLoadedEvent = new Event('spritesLoaded');
			listener.dispatchEvent(spritesLoadedEvent);
		}
	}
}

function spriteNodesToSpriteObjects(main,spriteNodes,listener) {
	// create canvas and set canvas style
	let canvas = new Canvas(main, 640, 360);

	// Create sprite objects
	let sprites = createSpriteObjects(spriteNodes, canvas);
	main.appendChild(sprites[0].img);

	/*
	// Draw sprite on canvas
	canvas.drawSprite(sprites.stand[3], 0, 0);
	canvas.drawSprite(sprites.anim1[3], 100, 0);
	canvas.drawSprite(sprites.anim2[3], 200, 0);
	canvas.drawSprite(sprites.anim3[3], 300, 0);
	canvas.drawSprite(sprites.anim2[3], 400, 0);
	canvas.drawSprite(sprites.anim1[3], 500, 0);
	canvas.drawSprite(sprites.jump[3], 100, 100);
	canvas.drawSprite(sprites.slide[3], 400, 100);
	*/

	//NOTE: CONTINUE CODE HERE
};

// Create Sprite objects for each sprite
function createSpriteObjects(spriteNodes, canvas) {
	let out = [];
	// Create Sprite objects
	for (let ind in spriteNodes) {
		let img = spriteNodes[ind];
		out.push( new Sprite(canvas, img, img.width, img.height) );
	}
	return out;
}
