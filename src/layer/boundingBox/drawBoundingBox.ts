import {
  applyToPoint,
  compose,
  decomposeTSR,
  inverse,
} from "transformation-matrix";

import { applyMatrix, identityMatrix } from "../../coord/Coord";
import { Point } from "../../coord/Point";
import { Layer } from "../Layer";
import { getLayerWithMatrix } from "../toLocal";

import { basicBoundingBox } from "./basicBoundingBox";
import { BoxElement } from "./boundingBoxLayout";

export const drawBoundingBox = (
  ctx: CanvasRenderingContext2D,
  root: Layer,
  layerId: string
) => {
  const found = getLayerWithMatrix(root, layerId);
  if (!found) return;
  const { matrix, layer } = found;
  const canvasMatrix = compose(identityMatrix, matrix);
  const tr = decomposeTSR(canvasMatrix);
  const scale = tr.scale.sx;

  ctx.save();
  applyMatrix(ctx, canvasMatrix);
  basicBoundingBox.draw(ctx, layer, scale);
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
  const tr = decomposeTSR(matrix);
  const scale = tr.scale.sx;

  const layerPoint = applyToPoint(inverse(matrix), canvasPoint);

  return basicBoundingBox.findHandle(layer, layerPoint, scale);
};
