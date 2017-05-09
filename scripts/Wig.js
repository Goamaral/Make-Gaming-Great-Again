class Wig {
  constructor(img) {
    this.sprite = new Sprite(img);
    this.baseY = null;
    this.baseX = null;
    this.y = null;
    this.x = null;

    this.positionArray = null;
    this.currentIndex = 0;
    this.turnIndex = 6;
    this.fullLoopIndex = 10;

    this.runTick = 0;
  }

  generatePositions() {
    this.positionArray = []
    for (let i=0;i<=10;++i) {
      this.positionArray.push(Math.floor(this.fun(i)));
    }
  }

  fun(x) {
    let a = 0.1;
    let b = -1;
    return a*(Math.pow(x,2)) + b*x
  }

  setCoord(x,y) {
    this.x = x;
    this.y = y;
    this.baseY = y;
    this.baseX = x;
    this.generatePositions();
  }

  update() {
    if (this.runTick == 2) {
      this.runTick = 0;
      let k = 20;
      if (this.currentIndex == this.fullLoopIndex) {
        this.currentIndex = 0;
      } else {
        ++this.currentIndex;
      }
      if (this.currentIndex < this.turnIndex) {
        this.x = this.baseX + this.currentIndex * k;
        this.y = this.baseY + this.positionArray[this.currentIndex] * k;
      } else {
        this.x = this.baseX + (this.fullLoopIndex - this.currentIndex) * k;
        this.y = this.baseY + this.positionArray[this.fullLoopIndex - this.currentIndex] * k;
      }
    } else {
      ++this.runTick;
    }
  }
}
