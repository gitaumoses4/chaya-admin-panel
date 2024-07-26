export function moveAlongBlock(block, velocity, x, y) {
  const nextX = x + velocity;
  const nextY = y;

  if (nextX < block.x) {
  }

  if (nextX > block.x + block.width) {
  }

  return { x: nextX, y: nextY };
}
