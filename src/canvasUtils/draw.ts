import { a2r } from "../coord/Coord";
import { Point } from "../coord/Point";

export const drawRectAt = (
  ctx: CanvasRenderingContext2D,
  point: Point,
  r: number
) => {
  ctx.rect(point.x - r, point.y - r, r * 2, r * 2);
};

export const drawCircleAt = (
  ctx: CanvasRenderingContext2D,
  point: Point,
  r: number
) => {
  ctx.arc(point.x, point.y, r, 0, Math.PI * 2);
};

export const drawCharAt = (
  ctx: CanvasRenderingContext2D,
  point: Point,
  char: string,
  angle = 0
) => {
  const box = ctx.measureText(char);

  ctx.save();
  ctx.translate(point.x, point.y);
  ctx.textBaseline = "middle";
  ctx.rotate(a2r(angle % 360));
  ctx.fillText(char, -box.width / 2, 0);

  ctx.restore();
};
