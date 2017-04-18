class Hero {
  constructor(sprites) {
    this.sprites = sprites;
    this.y = 0;
    this.currentSprite = null;

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
    for (let i=0; i<instructions.length(); ++i) {
      let instruction = instructions[i],
      runInstruction(instruction);
    }

    if (this.jumping > 0) {
      runInstruction('jump');
    }

    return this.sprites[this.currentSprite];
  }

  runInstruction(instruction) {
    switch (instruction) {
      case 'jump':
        if (this.jumping == 0) {
          this.jumping = this.jumpingTime;
          this.currentSprite = 'jump';
          runInstruction('up');
        } else {
          if (this.jumping < this.jumpingTime / 2) {
            runInstruction('down');
            this.jumping = this.jumping - 1;
          } else {
            runInstruction('up');
            this.jumping = this.jumping - 1;
          }
        }
        break;
      case 'slide':
        this.sliding = !this.sliding;
        if (this.sliding) {
          this.currentSprite = 'slide';
        } else {
          runInstruction('run');
        }
      case 'run':
        if (this.currentSprite == 'anim1') {
          this.currentSprite == 'anim2';
        } else if (this.currentSprite == 'anim2') {
          this.currentSprite == 'anim3';
        } else if (this.currentSprite == 'anim3'){
          this.currentSprite == 'anim1';
        } else if (this.jumping == 0 && this.sliding == false) {
          this.currentSprite == 'anim1';
        }
      case 'up':
        move(1);
      case 'down':
        move(-1);
      default:
        alert('Instruction not defined');
    }
  }
}
