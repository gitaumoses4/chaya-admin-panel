import { Sprite } from './sprite';
import { CharacterConfig, CharacterState } from './game-config';
import { GameContext } from './game-context';
import { Line } from './utils';

export class Character extends Sprite<CharacterConfig, CharacterState> {
  private currentBlock: Line | null = null;
  constructor(protected context: GameContext) {
    super(context, context.config.character);
  }

  setup() {
    super.setup();
    this.velocity.add(this.context.gravity);

    this.p.keyPressed = (e: any) => {
      if (e.key === 'ArrowRight') {
        this.moveRight();
      } else if (e.key === 'ArrowLeft') {
        this.moveLeft();
      } else if (e.key === 'ArrowUp' || e.key === ' ') {
        this.jump();
      }
    };

    this.p.keyReleased = (e: any) => {
      if (this.state === 'walk') {
        this.state = 'idle';
        this.velocity.set(this.context.gravity);
      }
    };
  }

  private jump() {
    if (this.state !== 'jump') {
      this.state = 'jump';
      this.currentBlock = null;
      this.velocity.add(this.p.createVector(0, -this.config.speed.jump));
    }
  }

  private moveRight() {
    if (this.state !== 'jump') {
      this.state = 'walk';
      this.velocity.add(this.p.createVector(this.config.speed.walk, 0));
    }
  }

  private moveLeft() {
    if (this.state !== 'jump') {
      this.state = 'walk';
      this.velocity.add(this.p.createVector(-this.config.speed.walk, 0));
    }
  }

  private checkCollision() {
    if (!this.currentBlock) {
      for (let obstacle of this.context.obstacles) {
        const block = obstacle.checkCollision(this);
        if (block) {
          this.currentBlock = block;
          this.state = 'idle';
          this.velocity.mult(0);
        }
      }
      this.velocity.add(this.context.gravity);
    } else {
      this.velocity.set(this.velocity.x, 0);
    }
  }

  draw() {
    this.checkCollision();
    this.moveAlongBlock();
    super.draw();
    this.context.updateCharacterPosition(this.position);
  }

  private moveAlongBlock() {
    if (this.currentBlock) {
    }
  }
}
