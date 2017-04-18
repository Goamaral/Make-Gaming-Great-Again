/*jshint esversion: 6 */

class Canvas {
  constructor(width,height) {
    this.root = null;
    // Creates canvas node
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    // Set canvas custom default style
    this.setStyle({
      margin: 'auto'
    });
    // Define context
    this.ctx = this.canvas.getContext('2d');
    // Object with available backgrounds
    this.backgrounds = {};
    // Name of current selected background
    this.currentBackground = null;
    // Hero object
    this.hero = null;
    // Enemies object
    this.enemies = {};
  }

  importEnemy(enemyName, enemy) {
    this.enemies[enemyName] = enemy;
  }

  // Import Hero
  importHero(hero) {
    this.hero = hero;
  }

  // Selects background
  selectBackground(backgroundName) {
    if (backgroundName in this.backgrounds) {
      this.currentBackground = backgroundName;
    }
  }

  // Imports background
  importBackground(name, background) {
    this.backgrounds[name] = background;
    if (this.currentBackground == null) {
      this.currentBackground = name;
    }
  }

  // Draws background
  drawBackground() {
    let background = this.backgrounds[this.currentBackground];
    let img = background.img;

    // If the image hasnt ended
    if (background.x < background.width) {
      ctx.drawImage(img, background.x, 0, background.screenWidth, img.height, 0, 0, background.width, background.height)
    } else {
      let widthOld = 2*background.screenWidth - background.x;
      let widthNew = ;
      ctx.drawImage(img, background.x, 0, widthOld, img.height, 0, 0, background.width, background.height)
      ctx.drawImage(img, 0, 0, widthNew, img.height, widthOld, 0, background.width, background.height)
    }
  }

  // Returns current full canvas image data
  getFrameData() {
    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  // Recieves JS plain Object with style and updates canvas style object
  setStyle(newStyle) {
    let prevStyle = this.canvas.style;

    for(let key in newStyle) {
      prevStyle[key] = newStyle[key];
    }
  }

  // Draws sprite in the canvas
  drawSprite(sprite, x, y) {
    let _img = sprite.img;
    this.ctx.drawImage(img, x, y, sprite.width, sprite.height);
  }

  // Get current canvas height
  getHeight() {
    return this.canvas.clientHeight;
  }

  // Get current canvas width
  getWidth() {
    return this.canvas.clientWidth;
  }

  // Mount this.canvas node in the dom
  mountCanvas(root=this.root) {
    if (this.root == null) {
      this.root = root;
	  }

    this.root.appendChild(this.canvas);
  }

  // Unmount canvas
  unmountCanvas() {
    this.root.removeChild(this.canvas);
  }
}

// export default Canvas;
