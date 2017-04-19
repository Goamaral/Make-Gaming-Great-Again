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

  gameloop() {
    window.requestAnimationFrame(gameLoop);

    this.update();
    this.render();
  }

  update() {
    let background = this.backgrounds[this.currentBackground];


  }

  // Import Enemy
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

  // Draws image in the canvas
  drawImage(img, x, y, width, height) {
    this.ctx.drawImage(img, x, y, width, height);
  }

  // Draws sprite in the canvas
  drawSprite(sprite, x, y) {
    let _imgData = sprite.getImageData();
    this.ctx.putImageData(_imgData, x, y);
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
