import {
  Matrix,
  compose,
  decomposeTSR,
  identity,
  rotateDEG,
  scale,
  translate,
} from "transformation-matrix";

import { DPR } from "./DPR";
import { Point } from "./Point";

export type Coord = Readonly<{
  position: Point;
  scale: number;
  angle: number;
  anchor?: Point;
}>;

export const a2r = (angle: number) => (angle * Math.PI) / 180;
export const r2a = (radian: number) => (radian * 180) / Math.PI;

export const DEFAULT_COORD: Coord = {
  position: { x: 0, y: 0 },
  scale: 1,
  angle: 0,
};

export const identityMatrix = compose(scale(DPR), identity());

export const applyCoord = (ctx: CanvasRenderingContext2D, coord: Coord) => {
  const { position: translate, scale, angle } = coord;
  ctx.rotate(a2r(angle));
  ctx.scale(scale, scale);
  ctx.translate(translate.x, translate.y);
};

export const applyMatrix = (ctx: CanvasRenderingContext2D, matrix: Matrix) => {
  ctx.resetTransform();
  ctx.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f);
};

export const toMatrix = (coord: Coord) => {
  const ax = coord.anchor?.x ?? 0;
  const ay = coord.anchor?.y ?? 0;
  return compose(
    translate(coord.position.x, coord.position.y),
    rotateDEG(coord.angle, ax, ay),
    scale(coord.scale, coord.scale, ax, ay)
  );
};

export const toCoord = (matrix: Matrix) => {
  const tr = decomposeTSR(matrix);
  return {
    position: { x: tr.translate.tx, y: tr.translate.ty },
    scale: tr.scale.sx,
    angle: r2a(tr.rotation.angle),
  };
};

export const multiplyCoord = (parent: Coord, child: Coord): Coord => {
  const parentMatrix = toMatrix(parent);
  const childMatrix = toMatrix(child);
  const matrix = compose(parentMatrix, childMatrix);
  return toCoord(matrix);
};
