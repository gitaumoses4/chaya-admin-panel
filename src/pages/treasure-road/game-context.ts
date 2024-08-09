import { GameConfig, ViewportConfig } from './game-config';
import p5 from 'p5';
import { Obstacle } from './obstacle';

export class GameContext {
  public readonly obstacles: Array<Obstacle> = [];
  public readonly characterPosition: p5.Vector = this.p.createVector(this.config.character.x, this.config.character.y);
  public readonly worldOffset = this.p.createVector(0, 0);
  private readonly mouseMoveListeners = new Set<Function>();
  private readonly keyPressListeners = new Set<Function>();
  private readonly keyReleaseListeners = new Set<Function>();
  private readonly mouseDragListeners = new Set<Function>();

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
    this.worldOffset.set(
      -Math.max(0, position.x - this.p.width / 3),
      -Math.min(this.config.world.height - this.p.height, Math.max(0, position.y - this.p.height / 3))
    );
  }

  public getWorld() {
    return this.obstacles.find((obstacle) => obstacle.getId() === 'world');
  }

  public addMouseMoveListener(listener: Function) {
    this.mouseMoveListeners.add(listener);
  }

  public addKeyPressListener(listener: Function) {
    this.keyPressListeners.add(listener);
  }

  public addKeyReleaseListener(listener: Function) {
    this.keyReleaseListeners.add(listener);
  }

  public addMouseDragListener(listener: Function) {
    this.mouseDragListeners.add(listener);
  }

  public mouseMoved(e: any) {
    this.mouseMoveListeners.forEach((listener) => listener(e));
  }

  public keyPressed(e: any) {
    this.keyPressListeners.forEach((listener) => listener(e));
  }

  public keyReleased(e: any) {
    this.keyReleaseListeners.forEach((listener) => listener(e));
  }

  public mouseDragged(e: any) {
    this.mouseDragListeners.forEach((listener) => listener(e));
  }
}
