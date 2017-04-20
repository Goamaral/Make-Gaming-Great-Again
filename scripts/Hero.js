class Hero {
  constructor(sprites) {
    this.sprites = sprites;
    this.y = 0;
    this.currentSprite = 'stand';

    this.jumping = 0;
    this.jumpingTime = 11;
    this.sliding = false;
  }

  setY(y) {
    this.y = y;
  }

  move(dy) {
    this.y = this.y + dy;
  }

  update(instructions) {
    let instruction = null;
    for (let i=0; i<instructions.length; ++i) {
      instruction = instructions[i];
      this.runInstruction(instruction);
    }

    if (this.jumping > 0) {
      this.runInstruction('jump');
    }

    return this.sprites[this.currentSprite];
  }

  runInstruction(instruction) {
    switch (instruction) {
      case 'jump':
        if (this.jumping == 0) {
          this.jumping = this.jumpingTime;
          this.currentSprite = 'jump';
          this.runInstruction('up');
        } else {
          if (this.jumping < this.jumpingTime / 2) {
            this.runInstruction('down');
            this.jumping = this.jumping - 1;
          } else {
            this.runInstruction('up');
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
        if (this.currentSprite == 'anim1') {
          this.currentSprite = 'anim2';
        } else if (this.currentSprite == 'anim2') {
          this.currentSprite = 'anim3';
        } else if (this.currentSprite == 'anim3'){
          this.currentSprite = 'anim1';
        } else if (this.jumping == 0 && this.sliding == false) {
          this.currentSprite = 'anim1';
        }
        console.log(this.currentSprite);
        break;
      case 'up':
        this.move(1);
        break;
      case 'down':
        this.move(-1);
        break;
      default:
        alert('Instruction not defined -> ' + instruction);
    }
  }
}
