import { Point } from "./Point";

export type Size = Readonly<{
  width: number;
  height: number;
}>;

export const addSize = (a: Size, b: Size): Size => ({
  width: a.width + b.width,
  height: a.height + b.height,
});

export const pointToSize = (point: Point): Size => ({
  width: point.x,
  height: point.y,
});
