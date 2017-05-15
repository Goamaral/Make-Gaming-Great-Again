/*jshint esversion: 6 */

class Canvas {
  constructor(width, height, mode=null) {
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
    // Defines context
    this.ctx = this.canvas.getContext('2d');
    this.ctx.font = '30px Monaco';
    // Object with available backgrounds
    this.backgrounds = {};
    this.backgroundsNames = ['desert', 'new-york', 'white-house'];
    // Name of current selected background
    this.currentBackground = null;
    // Object with available wigs
    this.wigs = {};
    // Name of current selected wig
    this.currentWig = null;
    // Hero object
    this.hero = null;
    // Enemies object
    this.enemies = {};
    // Framerate
    this.framerate = 30;
    this.ticksPerFrame = 60 / this.framerate;
    this.tickCount = 0;
    this.speed = 3;
    this.animationRequest = 1;
    this.level = 0;

    // Hero running lock
    this.locker = null;

    // Enemies properties
    this.nextEnemyDist = this.canvas.width / 3;
    this.enemiesQueue = [];
    this.head = 0;

    // If enemy has collide
    this.end = false;

    // Game mode
    this.mode = mode;
    this.maxRequests = 3000;
  }

  gameloop() {
    if (this.mode == 'storyGame' && this.animationRequest % 1000 == 0) {
      if (this.animationRequest == this.maxRequests) {
        window.cancelAnimationFrame(this.animationRequest);
        let ev = new Event('win');
        window.dispatchEvent(ev);
        return;
      }
      this.level++;
      this.speed += 1;
      this.hero.jumpingTime = 25 - (this.speed-3) * 4;
      this.selectBackground(this.backgroundsNames[this.level]);
    } else if (this.mode == 'infiniteGame' && this.animationRequest % 350 == 0 && this.speed < 6.6) {
      this.speed = this.speed + 0.2;
      this.hero.jumpingTime = 25 - (this.speed - 3) * 4;
    }

    if (this.end) {
      window.cancelAnimationFrame(this.animationRequest);
      let ev = new Event('gameEnded');
      ev.data = { score: this.animationRequest+1, mode: this.mode };
      window.dispatchEvent(ev);
      return;
    }

    this.animationRequest = window.requestAnimationFrame(this.gameloop.bind(this));

    this.tickCount += 1;
    if(this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;

      this.update(this.locker != null);
      this.render();
    }
  }

  keyDownHandler(key) {
    if (this.locker == null) {
      this.locker = key;
      this.hero.keyPress(key, this.speed);
    } else if (this.locker == key) {
      this.hero.keyPress(key, this.speed);
    }
  }

  keyUpHandler(key) {
    if (this.locker == key) {
      this.locker = null;
    }
  }

  checkColisions(sprite, x, y) {
    let s = sprite.getImageData();
    let canvasSection = this._canvas.ctx.getImageData(x, y, s.width, s.height);

    for (let i = 0; i < canvasSection.data.length; i += 4) {
      if (canvasSection.data[i+3] == 255 && s.data[i+3] == 255 ) {
        return true;
      }
    }

    return false;
  }

  update(locked) {
    let background = this.backgrounds[this.currentBackground];
    let wig = this.wigs[this.currentWig];

    background.update(this.speed);
    wig.update();
    this.hero.update(locked, this.speed);
    this.updateEnemies();
  }

  updateEnemies() {
    if (this._canvas === undefined) {
      this._canvas = new Canvas(this.canvas.width, this.canvas.height);
    }
    if (this.enemiesQueue.length == 0) {
      this.enemyGenerator();
      this.head = 0;
    } else if (this.enemiesQueue[this.head].x < this.nextEnemyDist) {
      this.enemyGenerator();
      this.head = 1;
    }

    this.enemiesQueue.map((enemy) =>{
      enemy.update(this.speed);
      if (enemy.x <= 0) {
        this.enemiesQueue.shift();
        this.head = 0;
      }
    });
  }

  enemyGenerator() {
    let enemyKeys = Object.keys(this.enemies);
    let enemyName = enemyKeys[this.random(0, enemyKeys.length)];
    let enemy = Object.assign(new Enemy(), this.enemies[enemyName]);
    this.resetEnemy(enemy);
    this.enemiesQueue.push(enemy);
  }

  random(min, max) {
    return Math.floor((Math.random() * max) + min);
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
    this.drawSprite(heroSprite, this.hero.x, this.hero.y);

    this.enemiesQueue.map((enemy) => {
      let enemySprite = enemy.sprites[enemy.currentSprite];
      if (!this.end) {
        self.drawSprite(heroSprite, this.hero.x, this.hero.y);
        this.end = this.checkColisions(enemySprite, enemy.x, enemy.y);
        self.resetCanvas();
      }
      this.drawSprite(enemySprite, enemy.x, enemy.y);
    });

    let wig = this.wigs[this.currentWig];
    let wigSprite = wig.sprite;
    this.drawSprite(wigSprite, wig.x, wig.y);
    const level = this.level + 1;
    if (this.mode == 'storyGame') this.ctx.fillText(['LEVEL ' + level], 300, 50);

    if (this.mode == 'infiniteGame') this.ctx.fillText(['SCORE', this.animationRequest+1].join(' '), 300, 50);
  }

  // Clear canvas
  resetCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // Import Enemy
  importEnemy(name, enemy) {
    this.enemies[name] = enemy;
  }

  // Reset Enemy
  resetEnemy(enemy) {
    switch(enemy.type) {
      case 'ground':
        enemy.setCoord(this.canvas.width, 280);
        break;
      case 'air':
        enemy.setCoord(this.canvas.width, 235);
        break;
    }
  }

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

  // Imports wig
  importWig(name, wig) {
    wig.setCoord(550, 150);
    this.wigs[name] = wig;
    if (this.currentWig == null) {
      this.currentWig = name;
    }
  }

  // Selects wig
  selectWig(wigName) {
    if (wigName in this.wigs) {
      this.currentWig = wigName;
    }

    this.wigs[this.currentWig].setCoord(550, 150);
  }

  // Draws background
  drawBackground() {
    let background = this.backgrounds[this.currentBackground];
    let backgroundImg = background.img;

    if (background.x < background.screenWidth) {
      this.ctx.drawImage(backgroundImg, background.x, 0, background.screenWidth, backgroundImg.height, 0, 0, background.screenWidth, background.height)
    } else {
      let widthOld = background.width - background.x;
      let widthNew = background.screenWidth - widthOld;
      this.ctx.drawImage(backgroundImg, background.x, 0, widthOld, backgroundImg.height, 0, 0, widthOld, background.height);
      this.ctx.drawImage(backgroundImg, 0, 0, widthNew, backgroundImg.height, widthOld, 0, widthNew, background.height);
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
