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

export const EMPTY_BLOCK = { x1: -1, y1: -1, x2: -1, y2: -1 };
export const GROUND_BLOCKS = [
  { x1: 0, y1: 1744, x2: 502, y2: 1744 },
  { x1: 0, y1: 1078, x2: 610, y2: 1078 },
  { x1: 658, y1: 740, x2: 1044, y2: 740 },
  { x1: 793, y1: 1201, x2: 1263, y2: 1201 },
  { x1: 899, y1: 1762, x2: 1516, y2: 1762 },
  { x1: 1269, y1: 923, x2: 1908, y2: 923 },
  { x1: 1700, y1: 1387, x2: 2450, y2: 1387 },
  { x1: 1789, y1: 1787, x2: 2439, y2: 1787 },
  { x1: 2342, y1: 980, x2: 2887, y2: 980 },
  { x1: 2922, y1: 1567, x2: 5000, y2: 1567 },
  { x1: 4495, y1: 1309, x2: 4557, y2: 1309 },
];
