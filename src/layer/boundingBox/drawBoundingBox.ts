import {
  applyToPoint,
  compose,
  decomposeTSR,
  inverse,
} from "transformation-matrix";

import { applyMatrix, identityMatrix } from "../../coord/Coord";
import { DPR } from "../../coord/DPR";
import { Point } from "../../coord/Point";
import { Layer } from "../Layer";
import { getLayerWithMatrix } from "../toLocal";

import { BoxElement } from "./boundingBoxLayout";
import { BoundingDrawOption } from "./boundingDrawOption";
import { findHandleInLayout } from "./findHandle";
import { partyBoundingBox } from "./partyBoundingBox";

const currentBoundingDef = partyBoundingBox;

export const drawBoundingBox = (
  ctx: CanvasRenderingContext2D,
  root: Layer,
  layerId: string,
  options: BoundingDrawOption = {}
) => {
  const found = getLayerWithMatrix(root, layerId);
  if (!found) return;
  const { matrix, layer } = found;
  const canvasMatrix = compose(identityMatrix, matrix);
  const tr = decomposeTSR(canvasMatrix);
  const scale = tr.scale.sx;

  ctx.save();
  applyMatrix(ctx, canvasMatrix);
  currentBoundingDef.draw(ctx, layer, scale, options);
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
  const layout = currentBoundingDef.layout(layer.size, scale * DPR);
  return findHandleInLayout(layout, layerPoint);
};
