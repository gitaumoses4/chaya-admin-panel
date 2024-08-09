import { Obstacle } from './obstacle';
import { WorldConfig } from './game-config';
import { GameContext } from './game-context';

export class World extends Obstacle<WorldConfig> {
  constructor(protected context: GameContext) {
    super(context, context.config.world);
  }
  setup() {
    super.setup();
  }

  draw() {
    this.p.translate(this.context.worldOffset);

    super.draw();
  }
}
