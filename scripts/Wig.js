class Wig {
  constructor(sprites, type) {
    this.sprites = sprites;
    this.baseY = 0;
    this.y = 0;
    this.x = 0;
    this.currentSprite = 'wig';
    this.type = type;
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
}
