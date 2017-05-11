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

  update(locked) {
    if (this.jumping > 0) {
      this.runInstruction('ContinueJump');
    } else if (this.sliding > 0) {
      this.runInstruction('ContinueSliding');
    } else {
      if (!locked) {
        this.runInstruction('run');
      }
    }
  }

  keyPress(key) {
    if(this.sliding == 0 && this.jumping == 0) {
      this.runInstruction(key);
    }
  }

  runInstruction(instruction) {
    if(debugging) {
      console.log(instruction);
    }
    switch (instruction) {
      case 'ArrowUp':
        this.jumping = this.jumpingTime;
        this.currentSprite = 'jump';
        this.runInstruction('up');
        break;
      case 'ContinueJump':
        if (this.jumping <= this.jumpingTime / 2) {
          this.runInstruction('down');
          this.jumping = this.jumping - 1;
        } else {
          this.runInstruction('up');
          this.jumping = this.jumping - 1;
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
        this.move(-15);
        break;
      case 'down':
        this.move(15);
        break;
      default:
        if (debugging) {
          alert('Instruction not defined -> ' + instruction);
        }
    }
  }
}
