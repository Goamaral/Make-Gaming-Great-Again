"use strict";

/*jshint esversion: 6 */

//import Canvas from 'Canvas';
//import Sprite from 'Sprite';

// NOTE: When arrow functions are used in global scope, they always refer to the global this, window. For safety always use ES5 anonymous function calls in global scope.
// NOTE: Auxiliar variables should hava a _ before their proper name, for example, _auxVar instead of auxVar


// On window full load
window.onload = function() {
  // Get main node from DOM
  let main = document.getElementsByTagName("main")[0];

  // Create canvas and set canvas style
  let canvas = new Canvas(768, 432, parent.document.getElementsByTagName('iframe')[0].name);
  canvas.mountCanvas(main);

  // Plain JS object of fully loaded resources
  let resources = {};
  // Number of tasks to complete
  let totalTasksToComplete = 4;

  // Create event to signal end of images loading
  window.addEventListener('imageLoadingComplete', imageLoadingCompleteHandler);

  // Load hero sprite images
  let heroSpriteNodesObject = loadHeroSpriteImages();
  // Creates event to signal end of hero sprite images loading
  window.addEventListener('heroSpritesLoaded', heroSpritesLoadedHandler);

  // Load enemies sprite images
  let enemiesSpriteNodesObject = loadEnemiesSpriteImages();
  // Creates event to signal end of enemies sprite images loading
  window.addEventListener('enemiesSpritesLoaded', enemiesSpritesLoadedHandler);

  // Creates event to signal end of wig sprite image loading
  window.addEventListener('wigSpritesLoaded', wigSpritesLoadedHandler);
  // Load enemies sprite images
  let wigSpriteNodesObject = loadWigsSpriteImages();

  // Create event to signal end of background images loading
  window.addEventListener('backgroundsLoaded', backgroundsLoadedHandler);
  //Load background images
  let backgroundNodesObject = loadBackgroundImages();

  // Waits for event heroSpritesLoaded event to be triggered
  function heroSpritesLoadedHandler() {
    window.removeEventListener('heroSpritesLoaded', heroSpritesLoadedHandler);
    resources['hero'] = spriteNodesToHeroObjects(heroSpriteNodesObject);
    if(Object.keys(resources).length == totalTasksToComplete) {
      let imageLoadingCompleteEvent = new Event('imageLoadingComplete');
      window.dispatchEvent(imageLoadingCompleteEvent);
    }
  }

  // Waits for event enemiesSpritesLoaded event to be triggered
  function enemiesSpritesLoadedHandler() {
    window.removeEventListener('enemiesSpritesLoaded', enemiesSpritesLoadedHandler);
    resources['enemies'] = spriteNodesToEnemiesObjects(enemiesSpriteNodesObject);
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

  // Waits for event wigLoaded event to be triggered
  function wigSpritesLoadedHandler() {
    window.removeEventListener('wigSpritesLoaded', wigSpritesLoadedHandler);
    resources['wigs'] = spriteNodesToWigObjects(wigSpriteNodesObject);
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

// Load hero sprite images
function loadHeroSpriteImages() {
  // Sprites path
  let spritesPath = './resources/images/hero/';
  // Sprite names
  let spriteNames = [ 'stand','jump','slide','anim1','anim2','anim3' ];
  // Load every sprite and create a image node for each one
  let heroSpritesObject = createImageNodes(spriteNames, spritesPath, 'hero');
  return heroSpritesObject;
}

//Load enemies sprite images
function loadEnemiesSpriteImages() {
  // Sprites path
  let spritesPath = './resources/images/obstacles/';

  // Mexican sprite names
  let mexicanSpriteNames = { name: 'mexican', arr: [ 'mexicanDown','mexicanUp' ], type: 'ground' };

  // Obama sprite names
  let obamaSpriteNames = { name: 'obama', arr: [ 'obamaDown','obamaUp' ], type: 'ground' };

  // Nyan sprite names
  let nyanSpriteNames = { name: 'nyan', arr: [ 'nyan', 'nyan2' ], type: 'air'};

  let spriteNames = { mexicanSpriteNames, obamaSpriteNames, nyanSpriteNames };

  // Load every sprite and create a image node for each one
  let enemiesSpritesObject = createImageNodes(spriteNames, spritesPath, 'enemies');
  return enemiesSpritesObject;
}

// Load wigs sprite images
function loadWigsSpriteImages() {
  // Sprites path
  let spritesPath = './resources/images/wigs/';
  // Sprite names
  let spriteNames = [ 'wig' ];
  // Load every sprite and create a image node for each one
  let wigSpritesObject = createImageNodes(spriteNames, spritesPath, 'wigs');
  return wigSpritesObject;
}

// Load background images
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

  if (mode == 'enemies') {
    var picCount = 0;
    for (let key in names) {
      let arr = names[key].arr;
      picCount += arr.length;
    }
    for (let key in names) {
      let arr = names[key].arr;
      let _out = {};
      for (let ind in arr) {
        let name = arr[ind];
        let node = new Image();
        node.onload = onloadHandler;
        node.src = path + name + '.png';
        _out[name] = node;
      }
      out[names[key].name] = { sprites: _out, type: names[key].type };
    }
    return out;
  }

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
    if(mode == 'hero') {
      //NOT RESPONSIVE
      targ.height = targ.naturalHeight/5;
      //NOT RESPONSIVE
      targ.width = targ.naturalWidth/5;
    } else if(mode == 'backgrounds') {
      //NOT RESPONSIVE
      targ.height = targ.naturalHeight;
      //NOT RESPONSIVE
      targ.width = targ.naturalWidth;
    } else if (mode == 'enemies') {
      //NOT RESPONSIVE
      targ.height = targ.naturalHeight;
      //NOT RESPONSIVE
      targ.width = targ.naturalWidth;
    } else if (mode == 'wigs') {
      //NOT RESPONSIVE
      targ.height = targ.naturalHeight;
      //NOT RESPONSIVE
      targ.width = targ.naturalWidth;
    }
    ++count;
    if (mode == 'enemies') {
      if(count == picCount) {
        let enemiesSpritesLoadedEvent = new Event('enemiesSpritesLoaded');
        window.dispatchEvent(enemiesSpritesLoadedEvent);
      }
    } else if(mode == 'wigs') {
      if(count == names.length) {
        let wigsSpritesLoadedEvent = new Event('wigSpritesLoaded');
        window.dispatchEvent(wigsSpritesLoadedEvent);
      }
    } else {
      if(count == names.length) {
        if(mode == 'hero') {
          let heroSpritesLoadedEvent = new Event('heroSpritesLoaded');
          window.dispatchEvent(heroSpritesLoadedEvent);
        } else if(mode == 'backgrounds') {
          let backgroundsLoadedEvent = new Event('backgroundsLoaded');
          window.dispatchEvent(backgroundsLoadedEvent);
        } else if(mode == 'wigs') {
          let wigsLoadedEvent = new Event('wigsLoaded');
          window.dispatchEvent(wigsLoadedEvent);
        }
      }
    }
  }
}

// Create Sprite objects for each sprite node of hero
function spriteNodesToHeroObjects(heroSpriteNodesObject) {
  let out = {};
  // Create Sprite objects
  for (let spriteName in heroSpriteNodesObject) {
    let img = heroSpriteNodesObject[spriteName];
    out[spriteName] = new Sprite(img);
  }
  return new Hero(out);
}

// Create Sprite objects for each sprite node of enemies
function spriteNodesToEnemiesObjects(enemiesSpriteNodesObject) {
  let out = {};

  for (let key in enemiesSpriteNodesObject) {
    let _out = [];
    let obj = enemiesSpriteNodesObject[key].sprites;
    // Create Sprite objects
    for (let spriteName in obj) {
      let img = obj[spriteName];
      _out.push(new Sprite(img));
    }
    out[key] = new Enemy(_out, enemiesSpriteNodesObject[key].type);
  }
  return out;
}

// Create Sprite objects for each wig node
function spriteNodesToWigObjects(wigNodesObject) {
  let out = {};
  // Create Sprite objects
  for (let wigName in wigNodesObject) {
    let img = wigNodesObject[wigName];
    out[wigName] = new Wig(img);
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
  let { hero, backgrounds, enemies, wigs } = resources;

  // Import hero
  canvas.importHero(hero);

  // Import wigs
  for( let wigName in wigs ) {
    canvas.importWig(wigName, wigs[wigName]);
  }

  // Import backgrounds
  for( let backgroundName in backgrounds ) {
    canvas.importBackground(backgroundName, backgrounds[backgroundName]);
  }

  // Import enemies
  for( let enemyName in enemies ) {
    canvas.importEnemy(enemyName, enemies[enemyName]);
  }

  parent.window.onkeydown = keyDownHandler;
  window.onkeydown = keyDownHandler;

  parent.window.onkeyup = keyUpHandler;
  window.onkeyup = keyUpHandler;

  window.addEventListener('gameEnded', gameEndedHandler);
  canvas.gameloop();

  function gameEndedHandler(ev) {
    let { score, mode } = ev.data;
    let main = parent.document.getElementsByTagName('main')[0]
    let startIframe = parent.document.getElementsByTagName('iframe')[0];
    if(mode == 'storyGame')
      talkWithParent("endOfStoryGame", 0);
    else
      talkWithParent("endOfInfiniteGame", score);
  }

  function keyDownHandler(ev) {
    let key = ev.key;
    if (key == 'ArrowDown' || key == 'ArrowUp') {
      canvas.keyDownHandler(ev.key);
    }
  }

  function keyUpHandler(ev) {
    canvas.keyUpHandler(ev.key);
  }
};

function talkWithParent(msg_given, score_given) {
  parent.postMessage({msg: msg_given, score: score_given}, '*');
}
