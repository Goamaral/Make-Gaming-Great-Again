/*jshint esversion: 6 */

class Canvas {
  constructor(width, height) {
    this.root = null;
    // Creates canvas node
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this._canvas = undefined;
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
    // Framerate
    this.framerate = 30;
    this.ticksPerFrame = 60 / this.framerate;
    this.tickCount = 0;
    // Hero running lock
    this.locker = null;
  }

  keyDownHandler(key) {
    if (this.locker == null) {
      this.locker = key;
      this.hero.keyPress(key);
    } else if (this.locker == key) {
      this.hero.keyPress(key);
    }
  }

  keyUpHandler(key) {
    if (this.locker == key) {
      this.locker = null;
    }
  }

  gameloop() {
    window.requestAnimationFrame(this.gameloop.bind(this))

    this.tickCount += 1;
    if(this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;

      this.update(this.locker != null);
      this.render();
    }

  }

  checkColisions(sprite, x, y) {
    if (this._canvas === undefined) {
      this._canvas = new Canvas(this.canvas.width, this.canvas.height);
    }
    let s = sprite.getImageData();
    let canvasSection = this._canvas.ctx.getImageData(x, y, s.width, s.height);

    for (let i=0; i<canvasSection.data.length; i+=4) {
      if (canvasSection.data[i+3] == 255 && s.data[i+3] == 255 ) {
        this.canvas.drawSprite(sprite, x, y);
        return false;
      }
    }

    this.canvas.drawSprite(sprite, x, y);

    return true;
  }

  update(locked) {
    let background = this.backgrounds[this.currentBackground];

    background.update(8);
    this.hero.update(locked);
  }

  render() {
    this.drawBackground();
    this.drawForeground();
  }

  drawForeground() {
    if (this._canvas === undefined) {
      this._canvas = new Canvas(this.canvas.width, this.canvas.height);
    }
    let self = this._canvas;
    self.resetCanvas();
    let heroSprite = this.hero.sprites[this.hero.currentSprite];
    self.drawSprite(heroSprite, this.hero.x, this.hero.y);
    this.drawSprite(heroSprite, this.hero.x, this.hero.y);
  }

  // Clear canvas
  resetCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Import Enemy
  importEnemy(enemyName, enemy) {
    enemy.setCoord(0, 280);
    this.enemies[enemyName] = enemy;
  }

  // Import Hero
  importHero(hero) {
    hero.setCoord(50, 280);
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
    if (background.x < background.screenWidth) {
      this.ctx.drawImage(img, background.x, 0, background.screenWidth, background.height, 0, 0, background.screenWidth, background.height)
    } else {
      let widthOld = background.width - background.x;
      let widthNew = background.screenWidth - widthOld;
      this.ctx.drawImage(img, background.x, 0, widthOld, img.height, 0, 0, widthOld, background.height);
      this.ctx.drawImage(img, 0, 0, widthNew, img.height, widthOld, 0, widthNew, background.height);
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
    this.ctx.drawImage(_img, x, y, sprite.width, sprite.height);
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
