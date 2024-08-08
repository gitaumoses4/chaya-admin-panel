import { GameConfig, ViewportConfig } from './game-config';
import p5 from 'p5';
import { Obstacle } from './obstacle';

export class GameContext {
  public readonly obstacles: Array<Obstacle> = [];
  public readonly characterPosition: p5.Vector = this.p.createVector(this.config.character.x, this.config.character.y);

  constructor(
    public p: p5,
    public config: GameConfig
  ) {}

  public getViewPortConfig(): ViewportConfig {
    return this.config.world.viewPort;
  }

  public get gravity() {
    return this.p.createVector(0, this.config.world.gravity);
  }

  public addObstacle(obstacle: Obstacle) {
    this.obstacles.push(obstacle);
  }

  public updateCharacterPosition(position: p5.Vector) {
    this.characterPosition.set(position);
  }

  public getWorld() {
    return this.obstacles.find((obstacle) => obstacle.getId() === 'world');
  }
}
