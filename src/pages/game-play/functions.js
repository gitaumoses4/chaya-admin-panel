export function svgPathToLines(svgPath) {
  //get all path

  let pathData = svgPath.match(/[A-Z][^A-Z]*/g);
  let lines = [];
  let lastX, lastY;

  pathData.forEach((segment) => {
    let command = segment[0];
    let coords = segment
      .slice(1)
      .trim()
      .split(/[\s,]+/)
      .map(Number);

    if (command === 'M') {
      // Move to command, start a new subpath
      lastX = coords[0];
      lastY = coords[1];
    } else if (command === 'L') {
      // Line to command, create a line segment
      let x = coords[0];
      let y = coords[1];
      lines.push({ x1: lastX, y1: lastY, x2: x, y2: y });
      lastX = x;
      lastY = y;
    } else if (command === 'H') {
      // Horizontal line to command, create a line segment
      let x = coords[0];
      lines.push({ x1: lastX, y1: lastY, x2: x, y2: lastY });
      lastX = x;
    }
  });

  return lines;
}

export function linesToSvgPath(lines) {
  if (lines.length === 0) return '';

  let pathData = [];
  let startX = lines[0].x1;
  let startY = lines[0].y1;

  pathData.push(`M ${startX} ${startY}`);

  lines.forEach((line) => {
    pathData.push(`L ${line.x2} ${line.y2}`);
  });

  return pathData.join(' ');
}

export function extractPaths(element) {
  const paths = element.querySelectorAll('path');

  const tiles = [];

  paths.forEach((path) => {
    tiles.push(...svgPathToLines(path.getAttribute('d')));
  });

  return tiles;
}

export function checkPositionInTile(tile, position) {
  const determinant = (tile.x2 - tile.x1) * (position.y - tile.y1) - (tile.y2 - tile.y1) * (position.x - tile.x1);

  if (determinant > 0) {
    return 'below';
  } else if (determinant < 0) {
    return 'above';
  } else {
    return 'on';
  }
}

export function findIntersection(tile, position, velocity) {
  const { x1, y1, x2, y2 } = tile;
  const { x: px, y: py } = position;
  const { dx, dy } = velocity;

  // Ensure the line segment is not a single point
  if (x1 === x2 && y1 === y2) {
    return null; // The segment is a point, not a line
  }

  // Define the parametric equations of the line segment
  let t1 = x2 - x1;
  let t2 = y2 - y1;

  // Calculate the denominator for the intersection calculation
  let denominator = dx * t2 - dy * t1;

  if (denominator === 0) {
    return null; // The lines are parallel and do not intersect
  }

  // Calculate the parameter t for the moving object
  let t = ((x1 - px) * t2 - (y1 - py) * t1) / denominator;

  // Calculate the intersection point using the parameter t
  let a = px + dx * t;
  let b = py + dy * t;

  // Check if the intersection point is within the bounds of the line segment
  if (Math.min(x1, x2) <= a && a <= Math.max(x1, x2) && Math.min(y1, y2) <= b && b <= Math.max(y1, y2)) {
    return { a: a, b: b };
  } else {
    return null; // The intersection point is not within the line segment
  }
}

export function findPoint(tile, position) {
  if (tile.y1 === tile.y2) {
    return { x: position.x, y: tile.y1 };
  }

  const m = (tile.y2 - tile.y1) / (tile.x2 - tile.x1);
  const b = tile.y1 - m * tile.x1;

  const x = (position.y - b) / m;

  return { x, y: position.y };
}
