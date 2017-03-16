"use strict";

/*jshint esversion: 6 */

//import Canvas from 'Canvas';
//import Sprite from 'Sprite';


// NOTE: When arrow functions are used in global scope, they always refer to the global this, window. For safety always use ES5 anonymous function calls in global scope.
// NOTE: Auxiliar variables should hava a _ before their proper name, for example, _auxVar instead of auxVar
// TODO: Make game responsive

// On window full load
this.onload = function() {
    //Get main node from DOM
    let main = document.getElementsByTagName("main")[0];
    //Load sprites
    let spritesPath = './resources/images/sprites/';
    // Sprites object : [width, height]
    let sprites = {
        stand: [481, 545],
        jump: [510, 657],
        slide: [586, 494],
        anim1: [501, 577],
        anim2: [480, 695],
        anim3: [527, 575]
    };

    // Load every sprite and create a image node for each one
    createSpriteNodes(sprites, spritesPath);

    // create canvas and set canvas style
    let canvas = new Canvas(main, 640, 360);

    // Create sprite objects
    createSpriteObjects(sprites, canvas);
    main.appendChild(sprites.stand[3].img);

    // Draw sprite on canvas
    canvas.drawSprite(sprites.stand[3], 0, 0);
    canvas.drawSprite(sprites.anim1[3], 100, 0);
    canvas.drawSprite(sprites.anim2[3], 200, 0);
    canvas.drawSprite(sprites.anim3[3], 300, 0);
    canvas.drawSprite(sprites.anim2[3], 400, 0);
    canvas.drawSprite(sprites.anim1[3], 500, 0);
    canvas.drawSprite(sprites.jump[3], 100, 100);
    canvas.drawSprite(sprites.slide[3], 400, 100);
};


// Data manipulation functions
// Create Sprite objects for each sprite
function createSpriteObjects(sprites, canvas) {
    // Get sprite names
    let spriteNames = Object.keys(sprites);
    // Create Sprite objects
    for (let ind in spriteNames) {
        let spriteName = spriteNames[ind];
        let width = sprites[spriteName][0];
        let height = sprites[spriteName][1];
        let img = sprites[spriteName][2];

        // NOT RESPONSIVE
        let sprite = new Sprite(canvas, img, width / 7, height / 7);
        sprites[spriteName].push(sprite);
    }
}

// Load every sprite and create a image node for each one
function createSpriteNodes(sprites, spritesPath) {
    // Get sprite names
    let spriteNames = Object.keys(sprites);
    // Create nodes
    for (let ind in spriteNames) {
        let spriteName = spriteNames[ind];
        let width = sprites[spriteName][0];
        let height = sprites[spriteName][1];
        //NOT RESPONSIVE
        let node = new Image(width / 7, height / 7);
        sprites[spriteName].push(node);
        node.src = spritesPath + spriteName + '.png';
    }
}
