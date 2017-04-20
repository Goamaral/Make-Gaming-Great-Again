class Hero {
  constructor(sprites) {
    this.sprites = sprites;
    this.y = 0;
    this.x = 0;
    this.currentSprite = 'stand';

    this.jumping = 0;
    this.jumpingTime = 21;
    this.sliding = false;

    this.runTick = 0;
    this.maxRunTicks = 5;
  }

  move(dy) {
    this.y = this.y + dy;
  }

  update(instruction) {
    if (this.jumping > 0) {
      this.runInstruction('ArrowUp');
    } else {
      this.runInstruction(instruction);
    }
  }

  runInstruction(instruction) {
    switch (instruction) {
      case 'ArrowUp':
        if (this.jumping == 0) {
          this.jumping = this.jumpingTime;
          this.currentSprite = 'jump';
          this.runInstruction('up');
        } else {
          if (this.jumping < this.jumpingTime / 2) {
            this.runInstruction('up');
            this.jumping = this.jumping - 1;
          } else {
            this.runInstruction('down');
            this.jumping = this.jumping - 1;
          }
        }
        break;
      case 'slide':
        this.sliding = !this.sliding;
        if (this.sliding) {
          this.currentSprite = 'slide';
        } else {
          this.runInstruction('run');
        }
        break;
      case 'run':
        if (this.runTick == 0) {
          if (this.currentSprite == 'anim1') {
            this.currentSprite = 'anim2';
          } else if (this.currentSprite == 'anim2') {
            this.currentSprite = 'anim3';
          } else if (this.currentSprite == 'anim3'){
            this.currentSprite = 'anim1';
          } else if (this.jumping == 0 && this.sliding == false) {
            this.currentSprite = 'anim1';
          }
          this.runTick += 1;
        } else if(this.runTick == this.maxRunTicks){
          this.runTick = 0;
        } else {
          this.runTick += 1;
        }
        break;
      case 'up':
        this.move(15);
        break;
      case 'down':
        this.move(-15);
        break;
      default:
        alert('Instruction not defined -> ' + instruction);
    }
  }
}
