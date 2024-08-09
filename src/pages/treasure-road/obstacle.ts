import { ObstacleConfig } from './game-config';
import { Sprite } from './sprite';
import { getPathFromSVG, Line, linesIntersect, pointInRect } from './utils';
import { GameContext } from './game-context';

export class Obstacle<Config extends ObstacleConfig = ObstacleConfig> extends Sprite<Config> {
  public blocks: Array<Line> = [];
  public isCompleted = this.config.isCompleted;
  public isHovered = false;

  constructor(
    protected context: GameContext,
    protected config: Config
  ) {
    super(context, config);
    this.context.addObstacle(this);
    getPathFromSVG(this.config.pathImageUri).then((lines) => {
      this.blocks = lines.map((line) => {
        return {
          start: this.p.createVector(line.start.x, line.start.y).add(this.position.x, this.position.y),
          end: this.p.createVector(line.end.x, line.end.y).add(this.position.x, this.position.y),
        };
      });
    });
  }

  setup() {
    super.setup();

    const mouseListener = (e: any) => {
      const mousePosition = this.p.createVector(e.offsetX, e.offsetY).sub(this.context.worldOffset);
      this.isHovered = pointInRect(mousePosition, {
        x: this.position.x,
        y: this.position.y,
        width: this.width,
        height: this.height,
      });
    };

    this.context.addMouseMoveListener(mouseListener);
    this.context.addMouseDragListener(mouseListener);
  }

  getId(): string {
    return this.config.id;
  }

  draw() {
    this.p.push();
    if (this.isCompleted || this.isHovered) {
      if (this.isHovered && !this.isCompleted) {
        this.p.tint(255, 30);
      }
      super.draw();
    }
    this.p.pop();
  }

  public canAcceptTool(toolType: string): boolean {
    return Boolean(this.config.requiredTools?.includes(toolType));
  }

  public checkCollision(sprite: Sprite<any, any>, isCharacter: boolean): Line | null {
    if (!this.isCompleted) return null;

    for (let block of this.blocks) {
      const a = { start: sprite.position, end: sprite.position.copy().add(sprite.velocity) };
      const b = { start: a.start.copy().add(0, sprite.height), end: a.end.copy().add(0, sprite.height) };
      const c = { start: a.start.copy().add(sprite.width, 0), end: a.end.copy().add(sprite.width, 0) };
      const d = { start: a.start.copy().add(sprite.width, sprite.height), end: a.end.copy().add(sprite.width, sprite.height) };

      if (isCharacter) {
        const e = { start: a.start.copy().add(sprite.width / 2, sprite.height / 2), end: a.end.copy().add(sprite.width / 2, sprite.height) };
        if (linesIntersect(e, block)) {
          return block;
        }
      } else {
        if (linesIntersect(a, block) || linesIntersect(b, block) || linesIntersect(c, block) || linesIntersect(d, block)) {
          return block;
        }
      }
    }
    return null;
  }
}
