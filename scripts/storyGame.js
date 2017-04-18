"use strict";

/*jshint esversion: 6 */

//import Canvas from 'Canvas';
//import Sprite from 'Sprite';

// NOTE: When arrow functions are used in global scope, they always refer to the global this, window. For safety always use ES5 anonymous function calls in global scope.
// NOTE: Auxiliar variables should hava a _ before their proper name, for example, _auxVar instead of auxVar
// TODO: Make game responsive

// On window full load
window.onload = function() {
  //Get main node from DOM
  let main = document.getElementsByTagName("main")[0];

  // create canvas and set canvas style
  let canvas = new Canvas(768, 432);
  canvas.mountCanvas(main);

  // Palin JS object of fully loaded resources
  let resources = {};
  // Number of tasks to complete
  let totalTasksToComplete = 2;
  // Create event to signal end of images loading
  window.addEventListener('imageLoadingComplete', imageLoadingCompleteHandler);

  // Creates event to signal end of sprite images loading
  window.addEventListener('spritesLoaded', spritesLoadedHandler);
  //Load sprite images
  let heroSpriteNodesObject = loadHeroSpriteImages();

  // Create event to signal end of background images loading
  window.addEventListener('backgroundsLoaded', backgroundsLoadedHandler);
  //Load background images
  let backgroundNodesObject = loadBackgroundImages();

  // Waits for event spritesLoaded event to be triggered
  function spritesLoadedHandler() {
    window.removeEventListener('spritesLoaded', spritesLoadedHandler);
    resources['hero'] = spriteNodesToHeroObjects(heroSpriteNodesObject);
    if(Object.keys(resources).length == totalTasksToComplete) {
      let imageLoadingCompleteEvent = new Event('imageLoadingComplete');
      window.dispatchEvent(imageLoadingCompleteEvent);
    }
  }

  // Waits for event backgroundsLoaded event to be triggered
  function backgroundsLoadedHandler() {
    window.removeEventListener('backgroundsLoaded', backgroundsLoadedHandler);
    resources['backgrounds'] = spriteNodesToBackgroundObjects(backgroundNodesObject);
    if(Object.keys(resources).length == totalTasksToComplete) {
      let imageLoadingCompleteEvent = new Event('imageLoadingComplete');
      window.dispatchEvent(imageLoadingCompleteEvent);
    }
  }

  // Waits for event imageLoadingComplete event to be triggered
  function imageLoadingCompleteHandler() {
    window.removeEventListener('imageLoadingComplete', imageLoadingCompleteHandler);
    imageLoadingComplete(canvas, resources);
  }
};

//Load hero sprite images
function loadHeroSpriteImages() {
  // Sprites path
  let spritesPath = './resources/images/hero/';
  // Sprite names
  let spriteNames = [ 'stand','jump','slide','anim1','anim2','anim3' ];
  // Load every sprite and create a image node for each one
  let heroSpritesObject = createImageNodes(spriteNames, spritesPath, 'sprites');
  return heroSpritesObject;
}

//Load background images
function loadBackgroundImages() {
  // Backgrounds path
  let backgroundsPath = './resources/images/backgrounds/';
  // Background names
  let backgroundNames = [ 'desert' ];
  // Load every background and create a image node for each one
  let backgroundNodesObject = createImageNodes(backgroundNames, backgroundsPath, 'backgrounds');
  return backgroundNodesObject;
}

// Load every sprite and create a image node for each one
// NOT RESPONSIVE
function createImageNodes(names, path, mode) {
  let out = {};
  let count = 0;

  // Create nodes
  for (let ind in names) {
    let name = names[ind];
    let node = new Image();
    node.onload = onloadHandler;
    node.src = path + name + '.png';
    out[name] = node;
  }
  return out;

  function onloadHandler(ev) {
    let targ = ev.target;
    if(mode == 'sprites') {
      //NOT RESPONSIVE
      targ.height = targ.naturalHeight/7;
      //NOT RESPONSIVE
      targ.width = targ.naturalWidth/7;
    } else if(mode == 'backgrounds') {
      //NOT RESPONSIVE
      targ.height = targ.naturalHeight;
      //NOT RESPONSIVE
      targ.width = targ.naturalWidth;
    }
    ++count;
    if(count == names.length) {
      if(mode == 'sprites') {
        let spritesLoadedEvent = new Event('spritesLoaded');
        window.dispatchEvent(spritesLoadedEvent);
      } else if(mode == 'backgrounds') {
        let backgroundsLoadedEvent = new Event('backgroundsLoaded');
        window.dispatchEvent(backgroundsLoadedEvent);
      }
    }
  }
}

// Create Sprite objects for each sprite ndoe
function spriteNodesToHeroObjects(heroSpriteNodesObject) {
  let out = {};
  // Create Sprite objects
  for (let spriteName in heroSpriteNodesObject) {
    let img = heroSpriteNodesObject[spriteName];
    out[spriteName] = new Hero(img);
  }
  return out;
}

// Create Sprite objects for each background node
function spriteNodesToBackgroundObjects(backgroundNodesObject) {
  let out = {};
  // Create Sprite objects
  for (let backgroundName in backgroundNodesObject) {
    let img = backgroundNodesObject[backgroundName];
    out[backgroundName] = new Background(img);
  }
  return out;
}

function imageLoadingComplete(canvas, resources) {
  let { hero, backgrounds } = resources;

  // Import hero
  canvas.importHero(hero);

  // Import background
  for( let backgroundName in backgrounds ) {
    canvas.importBackground(backgroundName, backgrounds[backgroundName]);
  }

  canvas.backgrounds[canvas.currentBackground].move(10000);

  canvas.drawBackground();

  //NOTE: CONTINUE CODE HERE
}
