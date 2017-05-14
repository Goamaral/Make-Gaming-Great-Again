class Enemy {
  constructor(sprites, type) {
    this.sprites = sprites;
    this.baseY = 0;
    this.y = 0;
    this.x = 0;
    this.currentSprite = 0;
    this.type = type;

    this.runTick = 0;
    this.maxRunTicks = 8;
  }

  move(dy) {
    this.y = this.y + dy;
  }

  setCoord(x,y) {
    this.x = x;
    this.y = y;
    this.baseY = y;
    this.slidingY = y + 25;
  }

  update(speed) {
    if (this.runTick == 0) {
      if (this.currentSprite == 0)
        this.currentSprite = 1;
      else if (this.currentSprite == 1 && this.sprites.length == 2)
        this.currentSprite = 0;
      else if (this.currentSprite == 1 && this.sprites.length == 3)
        this.currentSprite = 2;
      else
        this.currentSprite = 0;
      this.runTick += 1;
    } else if(this.runTick == this.maxRunTicks){
      this.runTick = 0;
    } else {
      this.runTick += 1;
    }
    this.x -= speed * 4;
  }
}
