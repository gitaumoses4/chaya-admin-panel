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
    const { characterPosition } = this.context;
    this.p.translate(
      -Math.max(0, characterPosition.x - this.p.width / 3),
      -Math.min(this.height - this.p.height, Math.max(0, characterPosition.y - this.p.height / 3))
    );

    super.draw();
  }
}
