export interface Point {
  x: number;
  y: number;
}

export interface Line {
  start: Point;
  end: Point;
}

export function svgPathToLines(svgPath: string) {
  let pathData = svgPath.match(/[A-Z][^A-Z]*/g);
  let lines: Array<Line> = [];
  let lastX: number, lastY: number;

  if (!pathData) return [];

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
      lines.push({
        start: {
          x: lastX,
          y: lastY,
        },
        end: {
          x: x,
          y: y,
        },
      });
      lastX = x;
      lastY = y;
    } else if (command === 'H') {
      // Horizontal line to command, create a line segment
      let x = coords[0];
      lines.push({
        start: {
          x: lastX,
          y: lastY,
        },
        end: {
          x: x,
          y: lastY,
        },
      });
      lastX = x;
    }
  });

  return lines;
}

export async function getPathFromSVG(svgUri: string): Promise<Array<Line>> {
  const svgContent = await fetch(svgUri).then((response) => response.text());

  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');

  const paths = svgDoc.querySelectorAll('path');

  let lines: Array<Line> = [];

  paths.forEach((path) => {
    const d = path.getAttribute('d');
    if (d) {
      lines = lines.concat(svgPathToLines(d));
    }
  });

  return lines;
}

export function linesIntersect(line: Line, line2: Line): boolean {
  const x1 = line.start.x;
  const y1 = line.start.y;
  const x2 = line.end.x;
  const y2 = line.end.y;

  const x3 = line2.start.x;
  const y3 = line2.start.y;
  const x4 = line2.end.x;
  const y4 = line2.end.y;

  const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

  if (denominator === 0) {
    return false;
  }

  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
  const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

  return t >= 0 && t <= 1 && u >= 0 && u <= 1;
}
