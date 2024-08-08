import { World } from './world';
import { Character } from './character';
import { GameContext } from './game-context';
import { GameConfig } from './game-config';
import p5 from 'p5';

export class Game {
  private readonly context = new GameContext(this.p, this.config);
  private readonly world = new World(this.context);
  private readonly character = new Character(this.context);
  constructor(
    private p: p5,
    private config: GameConfig
  ) {}

  public setup(): void {
    this.p.createCanvas(this.context.getViewPortConfig().width, this.context.getViewPortConfig().height);
    this.p.background(0);
    this.world.setup();
    this.character.setup();
  }

  public draw() {
    this.world.draw();

    this.p.push();
    this.p.translate(this.world.position);
    this.character.draw();
    this.p.pop();
  }
}
