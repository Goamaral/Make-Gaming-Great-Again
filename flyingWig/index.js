"use strict";

/*jshint esversion: 6 */

//import Canvas from 'Canvas';
//import Sprite from 'Sprite';

// NOTE: When arrow functions are used in global scope, they always refer to the global this, window. For safety always use ES5 anonymous function calls in global scope.
// NOTE: Auxiliar variables should hava a _ before their proper name, for example, _auxVar instead of auxVar
// TODO: Make game responsive

// On window full load
this.onload = () => {
	//Get main node from DOM
	let main = document.getElementsByTagName("main")[0];

	// create canvas and set canvas style
	let canvas = new Canvas(main, 640, 360);

	//Load sprites
	let spritesPath = './resources/images/sprites/';

	// Sprite names
	let spriteNames = [ 'stand','jump','slide','anim1','anim2','anim3' ];

	// Create auxiliary tag to listen to events
	let listener = document.createElement('listener');

	// Load every sprite and create a image node for each one
	let spriteNodesObject = createSpriteNodes(spriteNames, spritesPath, listener);

	// Waits for even spritesLoaded to be triggered
	listener.addEventListener('spritesLoaded', spritesLoadedHandler);
	function spritesLoadedHandler() {
		console.log('spritesLoadedHandler');
		listener.removeEventListener('spritesLoaded', spritesLoadedHandler);
		spriteNodesToSpriteObjects(main, canvas, spriteNodesObject, listener);
	}
}

// Load every sprite and create a image node for each one
// NOT RESPONSIVE
function createSpriteNodes(spriteNames, spritesPath, listener) {
	let out = {};
	let count = 0;

	// Create nodes
	for (let ind in spriteNames) {
		let spriteName = spriteNames[ind];
		let node = new Image();
		node.onload = onloadHandler;
		node.src = spritesPath + spriteName + '.png';
		out[spriteName] = node;
	}

	return out;

	function onloadHandler(ev) {
		let targ = ev.target;
		//NOT RESPONSIVE
		targ.height = targ.naturalHeight/7;
		//NOT RESPONSIVE
		targ.width = targ.naturalWidth/7;
		++count;
		if(count == spriteNames.length) {
			let spritesLoadedEvent = new Event('spritesLoaded');
			listener.dispatchEvent(spritesLoadedEvent);
		}
	}
}

function spriteNodesToSpriteObjects(main, canvas, spriteNodesObject, listener) {
	// Create sprite objects
	let sprites = createSpriteObjects(spriteNodesObject, main);

	// Draw sprite on canvas
	canvas.drawSprite(sprites.stand, 0, 0);
	canvas.drawSprite(sprites.anim1, 100, 0);
	canvas.drawSprite(sprites.anim2, 200, 0);
	canvas.drawSprite(sprites.anim3, 300, 0);
	canvas.drawSprite(sprites.anim2, 400, 0);
	canvas.drawSprite(sprites.anim1, 500, 0);
	canvas.drawSprite(sprites.jump, 100, 100);
	canvas.drawSprite(sprites.slide, 400, 100);

	//NOTE: CONTINUE CODE HERE
};

// Create Sprite objects for each sprite
function createSpriteObjects(spriteNodesObject, main) {
	let out = {};
	// Create Sprite objects
	for (let spriteName in spriteNodesObject) {
		let img = spriteNodesObject[spriteName];
		out[spriteName] = new Sprite(main, img);
	}
	return out;
}
