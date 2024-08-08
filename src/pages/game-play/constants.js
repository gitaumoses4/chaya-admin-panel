export const WORLD_WIDTH = 5000;
export const WORLD_HEIGHT = 2146;

export const PLAYER_WIDTH = 64;
export const PLAYER_HEIGHT = 72;

export const GRAVITY = 0.5;

export const MAX_FALL_DISTANCE = 100;

export const PLAYER_SPEED = {
  walk: 2,
  run: 4,
  jump: 18,
};

export const PLAYER_SPRITE_POSITIONS = {
  idle: {
    start: { x: -96, y: -20 },
    step: 80,
    count: 6,
  },
  walk: {
    start: { x: -96, y: -112 },
    step: 80,
    count: 7,
  },
  run: {
    start: { x: -96, y: -209 },
    step: 80,
    count: 8,
  },
  jump: {
    start: { x: -96, y: -298 },
    step: 82,
    count: 8,
  },
};
export const EMPTY_TILE = { x1: -1, y1: -1, x2: -1, y2: -1 };
