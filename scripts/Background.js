class Background extends Sprite {
  constructor(img) {
    super(img);
    this.screenWidth = img.width/2;
    this.x = 0;
  }

  move(dx) {
    this.x = this.x + dx;
    if (this.x > 2*this.screenWidth ) {
      this.x = 0;
    }
  }

  update(speed) {
    this.move(speed * 4);
  }
}
