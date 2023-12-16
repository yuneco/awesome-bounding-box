import {
  applyToPoint,
  compose,
  identity,
  inverse,
} from "transformation-matrix";

import { applyMatrix, identityMatrix, toMatrix } from "../../coord/Coord";
import { Point } from "../../coord/Point";
import { findLayerPathById } from "../findLayerById";
import { Layer } from "../Layer";

import { basicBoundingBox } from "./basicBoundingBox";
import { BoxElement } from "./boundingBoxLayout";

const getLayerWithMatrix = (root: Layer, layerId: string) => {
  const path = findLayerPathById(root, layerId);
  if (!path) return;
  const layer = path[path.length - 1];
  if (!layer) return;

  const matrix = path.reduce((acc, layer) => {
    return compose(acc, toMatrix(layer.coord));
  }, identity());

  return { matrix, layer };
};

export const drawBoundingBox = (
  ctx: CanvasRenderingContext2D,
  root: Layer,
  layerId: string
) => {
  const found = getLayerWithMatrix(root, layerId);
  if (!found) return;
  const { matrix, layer } = found;
  const canvasMatrix = compose(identityMatrix, matrix);

  ctx.save();
  applyMatrix(ctx, canvasMatrix);
  basicBoundingBox.draw(ctx, layer);
  ctx.restore();
};

export const getBoundinfBoxHandleAt = (
  canvasPoint: Point,
  root: Layer,
  layerId: string
): BoxElement | undefined => {
  const found = getLayerWithMatrix(root, layerId);
  if (!found) return;

  const { matrix, layer } = found;
  const scale = matrix.a;

  const layerPoint = applyToPoint(inverse(matrix), canvasPoint);

  return basicBoundingBox.findHandle(layer, layerPoint, scale);
};
