import gameBg from '../../assets/game_bg.png';
import character from '../../assets/player.png';
import groundPath from '../../assets/paths/ground-path.svg';
import ladder1 from '../../assets/ladder-1.png';
import ladder1Path from '../../assets/paths/ladder-1-path.svg';
import bridge1 from '../../assets/bridge-1.png';
import bridge1Path from '../../assets/paths/bridge-1-path.svg';

export interface SpriteSheetConfig {
  start: { x: number; y: number };
  step: number;
  count: number;
}

export interface SpriteConfig<States extends string = never> {
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  width: number;
  height: number;
  bgImageUri: string;
  initialState?: States;
  spriteSheet?: Record<States, SpriteSheetConfig>;
}

export interface ObstacleConfig<States extends string = never> extends SpriteConfig<States> {
  id: string;
  pathImageUri: string;
  isCompleted?: boolean;
  requiredTools?: Array<string>;
}

export interface ViewportConfig {
  width: number;
  height: number;
}

export interface WorldConfig extends ObstacleConfig {
  viewPort: ViewportConfig;
  gravity: number;
}

export type CharacterState = 'idle' | 'walk' | 'run' | 'jump' | 'climb' | 'celebrate';

export interface CharacterSpeedConfig {
  walk: number;
  jump: number;
  run: number;
}

export interface CharacterConfig extends SpriteConfig<CharacterState> {
  speed: CharacterSpeedConfig;
}

export interface GameConfig {
  world: WorldConfig;
  character: CharacterConfig;
  obstacles: Array<ObstacleConfig>;
}

export const GAME_CONFIG: GameConfig = {
  world: {
    id: 'world',
    pathImageUri: groundPath,
    gravity: 0.5,
    bgImageUri: gameBg,
    width: 5000,
    height: 2146,
    isCompleted: true,
    viewPort: {
      width: Math.min(1400, window.innerWidth),
      height: window.innerHeight,
    },
  },
  character: {
    bgImageUri: character,
    x: 10,
    y: 1300,
    width: 64,
    height: 72,
    initialState: 'idle',
    speed: {
      walk: 5,
      jump: 18,
      run: 10,
    },
    spriteSheet: {
      idle: {
        start: { x: 96, y: 20 },
        step: 80,
        count: 6,
      },
      walk: {
        start: { x: 96, y: 112 },
        step: 80,
        count: 7,
      },
      run: {
        start: { x: 96, y: 209 },
        step: 80,
        count: 8,
      },
      jump: {
        start: { x: 96, y: 298 },
        step: 82,
        count: 8,
      },
      climb: {
        start: { x: 96, y: 298 },
        step: 82,
        count: 8,
      },
      celebrate: {
        start: { x: 96, y: 20 },
        step: 80,
        count: 6,
      },
    },
  },
  obstacles: [
    {
      id: 'ladder-1',
      x: 169,
      y: 1135,
      width: 125,
      height: 611,
      pathImageUri: ladder1Path,
      bgImageUri: ladder1,
      requiredTools: ['ladder'],
    },
    {
      id: 'bridge-1',
      x: 437,
      y: 1604,
      width: 531,
      height: 170,
      pathImageUri: bridge1Path,
      bgImageUri: bridge1,
      requiredTools: ['bridge'],
    },
  ],
};
