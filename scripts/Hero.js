let debugging = false;

class Hero {
  constructor(sprites) {
    this.sprites = sprites;
    this.baseY = 0;
    this.y = 0;
    this.x = 0;
    this.currentSprite = 'stand';

    this.jumping = 0;
    this.jumpingTime = 25;
    this.sliding = 0;
    this.slidingY = 0;
    this.slidingTime = 1;

    this.runTick = 0;
    this.maxRunTicks = 5;

    this.lock = false;
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

  update(locked, speed) {
    if (this.jumping > 0) {
      this.runInstruction('ContinueJump', speed);
    } else if (this.sliding > 0) {
      this.runInstruction('ContinueSliding', speed);
    } else {
      if (!locked) {
        this.runInstruction('run', speed);
      }
    }
  }

  keyPress(key, speed) {
    if(this.sliding == 0 && this.jumping == 0) {
      this.runInstruction(key, speed);
    }
  }

  runInstruction(instruction, speed) {
    if(debugging) {
      console.log(instruction);
    }
    switch (instruction) {
      case 'ArrowUp':
        this.jumping = this.jumpingTime;
        this.currentSprite = 'jump';
        this.runInstruction('up', speed);
        break;
      case 'ContinueJump':
        if (this.jumping <= this.jumpingTime / 2) {
          this.runInstruction('down', speed);
          this.jumping = this.jumping - 1;
        } else {
          this.runInstruction('up', speed);
          this.jumping = this.jumping - 1;
        }
        if (this.jumping <= 0) {
          this.jumping = 0;
          this.y = this.baseY;
        }
        break;
      case 'ArrowDown':
        this.y = this.slidingY;
        this.currentSprite = 'slide';
        this.sliding = this.slidingTime;
        break;
      case 'ContinueSliding':
        this.sliding = this.sliding - 1;
        break;
      case 'run':
        if (this.runTick == 0) {
          if (this.currentSprite == 'anim1') {
            this.currentSprite = 'anim2';
          } else if (this.currentSprite == 'anim2') {
            this.currentSprite = 'anim3';
          } else if (this.currentSprite == 'anim3'){
            this.currentSprite = 'anim1';
          } else if (this.jumping == 0 && this.sliding == 0) {
            this.currentSprite = 'anim1';
            this.y = this.baseY;
          }
          this.runTick += 1;
        } else if(this.runTick == this.maxRunTicks){
          this.runTick = 0;
        } else {
          if (this.jumping != 0 || this.sliding != 0) {
            this.runTick = 0;
          } else {
            this.runTick += 1;
          }
        }
        break;
      case 'up':
        this.move(-(15 + (speed-3) * 5));
        break;
      case 'down':
        this.move(15 + (speed-3) * 5);
        break;
      default:
        if (debugging) {
          alert('Instruction not defined -> ' + instruction);
        }
    }
  }
}
