import { World } from './world';
import { Character } from './character';
import { GameContext } from './game-context';
import { GameConfig } from './game-config';
import p5 from 'p5';
import { Obstacle } from './obstacle';

export class Game {
  private readonly context = new GameContext(this.p, this.config);
  private readonly world = new World(this.context);
  private readonly character = new Character(this.context);
  private readonly obstacles: Array<Obstacle> = [];
  constructor(
    private p: p5,
    private config: GameConfig
  ) {
    this.config.obstacles.forEach((obstacleConfig) => {
      const obstacle = new Obstacle(this.context, obstacleConfig);
      this.obstacles.push(obstacle);
    });
  }

  public setup(): void {
    this.p.createCanvas(this.context.getViewPortConfig().width, this.context.getViewPortConfig().height);
    this.p.background(0);

    this.p.mouseMoved = this.context.mouseMoved.bind(this.context);
    this.p.keyPressed = this.context.keyPressed.bind(this.context);
    this.p.keyReleased = this.context.keyReleased.bind(this.context);
    this.p.mouseDragged = this.context.mouseDragged.bind(this.context);

    this.world.setup();
    this.character.setup();
    this.obstacles.forEach((obstacle) => obstacle.setup());
  }

  public draw() {
    this.world.draw();
    this.p.push();
    this.p.translate(this.world.position);

    this.obstacles.forEach((obstacle) => obstacle.draw());

    this.drawPath();

    this.character.draw();

    this.p.pop();
  }

  public dropTool(type: string): boolean {
    let accepted = false;
    for (let obstacle of this.obstacles) {
      if (obstacle.isHovered) {
        if (obstacle.canAcceptTool(type)) {
          obstacle.isCompleted = true;
          accepted = true;
        }
      }
    }
    return accepted;
  }

  private drawPath() {
    this.obstacles
      .filter((obstacle) => obstacle.isCompleted)
      .forEach((obstacle) => {
        this.p.noFill();
        this.p.stroke(255, 0, 0);
        this.p.strokeWeight(5);
        for (let block of obstacle.blocks) {
          this.p.line(block.start.x, block.start.y, block.end.x, block.end.y);
        }
      });

    for (let block of this.world.blocks) {
      this.p.noFill();
      this.p.stroke(255, 0, 0);
      this.p.strokeWeight(5);
      this.p.line(block.start.x, block.start.y, block.end.x, block.end.y);
    }
  }
}
