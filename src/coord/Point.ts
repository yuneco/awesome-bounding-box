import { r2a } from "./Coord";

export type Point = Readonly<{
  x: number;
  y: number;
}>;

export const P_ZERO = { x: 0, y: 0 };

export const addPoint = (a: Point, b: Point): Point => ({
  x: a.x + b.x,
  y: a.y + b.y,
});

export const subPoint = (a: Point, b: Point): Point => ({
  x: a.x - b.x,
  y: a.y - b.y,
});

export const distance = (a: Point, b: Point) =>
  Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

/**
 * return angle of pA O pB
 * @param pA
 * @param pB
 * @returns
 */
export const anglePoints = (pA: Point, pB: Point) => {
  const angleA = Math.atan2(pA.y, pA.x);
  const angleB = Math.atan2(pB.y, pB.x);
  const angle = r2a(angleB - angleA);
  return angle;
};

/**
 * normalize angle to 0 ~ 360
 * @param angle deg
 */
export const normalizeAngle = (angle: number) => {
  return angle > 0 ? angle % 360 : 360 + (angle % 360);
};
