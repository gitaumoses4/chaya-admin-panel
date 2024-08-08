import gameBg from '../../assets/game_bg.png';
import character from '../../assets/player.png';
import groundPath from '../../assets/paths/ground-path.svg';

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
      jump: 20,
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
  obstacles: [],
};