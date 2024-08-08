import { ObstacleConfig } from './game-config';
import { Sprite } from './sprite';
import p5 from 'p5';
import { getPathFromSVG, Line, linesIntersect } from './utils';
import { GameContext } from './game-context';

export class Obstacle<Config extends ObstacleConfig = ObstacleConfig> extends Sprite<Config> {
  private pathImage: p5.Image | null = null;
  public blocks: Array<Line> = [];

  constructor(
    protected context: GameContext,
    protected config: Config
  ) {
    super(context, config);
    this.context.addObstacle(this);

    this.p.loadImage(this.config.pathImageUri, (img) => {
      this.pathImage = img;
    });

    getPathFromSVG(this.config.pathImageUri).then((lines) => {
      this.blocks = lines;
    });
  }

  getId(): string {
    return this.config.id;
  }

  draw() {
    super.draw();

    if (this.pathImage) {
      this.p.image(this.pathImage, this.position.x, this.position.y, this.width, this.height);
    }
  }

  public checkCollision(sprite: Sprite<any, any>): Line | null {
    for (let block of this.blocks) {
      const a = { start: sprite.position, end: sprite.position.copy().add(sprite.velocity) };
      const b = { start: a.start.copy().add(0, sprite.height), end: a.end.copy().add(0, sprite.height) };
      const c = { start: a.start.copy().add(sprite.width, 0), end: a.end.copy().add(sprite.width, 0) };
      const d = { start: a.start.copy().add(sprite.width, sprite.height), end: a.end.copy().add(sprite.width, sprite.height) };

      if (linesIntersect(a, block) || linesIntersect(b, block) || linesIntersect(c, block) || linesIntersect(d, block)) {
        return block;
      }
    }
    return null;
  }
}
