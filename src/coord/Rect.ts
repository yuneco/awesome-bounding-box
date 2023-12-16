import { Point } from "./Point";

export type Rect = Readonly<{
  x: number;
  y: number;
  width: number;
  height: number;
}>;

export const moveRect = (rect: Rect, point: Point): Rect => ({
  x: rect.x + point.x,
  y: rect.y + point.y,
  width: rect.width,
  height: rect.height,
});

export const expandRect = (rect: Rect, offset: number): Rect => ({
  x: rect.x - offset,
  y: rect.y - offset,
  width: rect.width + offset * 2,
  height: rect.height + offset * 2,
});

export const isInRect = (rect: Rect, point: Point): boolean => {
  return (
    point.x >= rect.x &&
    point.y >= rect.y &&
    point.x <= rect.x + rect.width &&
    point.y <= rect.y + rect.height
  );
};
