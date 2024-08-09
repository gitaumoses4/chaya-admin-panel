import { Sprite } from './sprite';
import { CharacterConfig, CharacterState } from './game-config';
import { GameContext } from './game-context';
import { findIntersection, Line } from './utils';

export class Character extends Sprite<CharacterConfig, CharacterState> {
  private currentBlock: Line | null = null;
  constructor(protected context: GameContext) {
    super(context, context.config.character);
  }

  setup() {
    super.setup();
    this.velocity.add(this.context.gravity);

    this.context.addKeyPressListener((e: any) => {
      if (e.key === 'ArrowRight') {
        this.moveRight();
      } else if (e.key === 'ArrowLeft') {
        this.moveLeft();
      } else if (e.key === 'ArrowUp' || e.key === ' ') {
        this.jump();
      }
    });

    this.context.addKeyReleaseListener((e: any) => {
      if (this.state !== 'jump') {
        this.state = 'idle';
        this.velocity.set(0, 0);
      }
    });
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
    }
    this.velocity.add(this.p.createVector(this.config.speed.walk, 0));
  }

  private moveLeft() {
    if (this.state !== 'jump') {
      this.state = 'walk';
    }
    this.velocity.add(this.p.createVector(-this.config.speed.walk, 0));
  }

  private checkCollision() {
    this.velocity.add(this.context.gravity);

    for (let obstacle of this.context.obstacles) {
      const block = obstacle.checkCollision(this, true);
      if (block) {
        this.currentBlock = block;
        const intersection = findIntersection(block, {
          start: this.position.copy().add(this.width / 2, this.height),
          end: this.position
            .copy()
            .add(this.width / 2, this.height)
            .add(this.velocity),
        });

        if (intersection) {
          this.position.set(intersection.x - this.width / 2, intersection.y - this.height);
        }

        if (this.state === 'jump') {
          this.state = 'idle';
          this.velocity.set(0, 0);
        } else {
          const gradient = (block.end.y - block.start.y) / (block.end.x - block.start.x);
          const angle = Math.atan(gradient);
          const dy = Math.tan(angle) * this.velocity.x;

          this.velocity.set(this.velocity.x, dy);
        }
      }
    }
  }

  draw() {
    this.checkCollision();
    super.draw();
    this.context.updateCharacterPosition(this.position);
  }
}
