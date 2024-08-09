import { SpriteConfig } from './game-config';
import p5 from 'p5';
import { GameContext } from './game-context';

export class Sprite<Config extends SpriteConfig<State> = SpriteConfig<any>, State extends string = never> {
  private image: p5.Image | null = null;

  public p: p5 = this.context.p;
  public position: p5.Vector = this.p.createVector(this.config.x, this.config.y);
  public velocity = this.p.createVector(this.config.vx, this.config.vy);
  public width = this.config.width;
  public height = this.config.height;
  public state = this.config.initialState;

  constructor(
    protected context: GameContext,
    protected config: Config
  ) {
    this.p.loadImage(this.config.bgImageUri, (img) => {
      this.image = img;
    });
  }

  public setup(): void {}

  public draw(): void {
    this.p.push();
    this.p.translate(this.position.x, this.position.y);
    this.position.add(this.velocity);

    if (this.velocity.x < 0) {
      this.p.translate(this.width, 0);
      this.p.scale(-1, 1);
    }

    this.drawImage();

    this.p.pop();
  }

  public drawImage(x: number = 0, y: number = 0) {
    if (this.image) {
      if (this.config.spriteSheet && this.state) {
        const { start, step, count } = this.config.spriteSheet[this.state];

        const sx = start.x + (Math.floor(this.p.frameCount / count) % count) * step;
        const sy = start.y;

        this.p.image(this.image, x, y, this.width, this.height, sx, sy, this.width, this.height);
      } else {
        this.p.image(this.image, x, y, this.width, this.height);
      }
    }
  }
}
