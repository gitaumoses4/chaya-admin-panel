export const WORLD_WIDTH = 5000;
export const WORLD_HEIGHT = 2146;

export const PLAYER_WIDTH = 64;
export const PLAYER_HEIGHT = 72;

export const GRAVITY = 0.5;

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

export const NO_BLOCK = { x: -1, y: -1, width: 0 };

export const BLOCKS = [
  { x: 0, y: 1744, width: 502 },
  { x: 0, y: 1078, width: 610 },
  { x: 658, y: 740, width: 386 },
  { x: 793, y: 1201, width: 470 },
  { x: 899, y: 1762, width: 617 },
  { x: 1269, y: 923, width: 639 },
  { x: 1700, y: 1387, width: 750 },
  { x: 1789, y: 1787, width: 650 },
  { x: 2342, y: 980, width: 545 },
  { x: 2922, y: 1567, width: 2078 },
  { x: 4495, y: 1309, width: 62 },
];
