import {
  Matrix,
  applyToPoint,
  compose,
  identity,
  inverse,
} from "transformation-matrix";

import { toMatrix } from "../coord/Coord";
import { Point } from "../coord/Point";

import { Layer } from "./Layer";

const isInLayer = (layer: Layer, point: Point): boolean => {
  return (
    point.x >= 0 &&
    point.y >= 0 &&
    point.x <= layer.size.width &&
    point.y <= layer.size.height
  );
};

const findLayer = (
  layer: Layer,
  matrix: Matrix,
  point: Point
): Layer | undefined => {
  const selfMatrix = compose(matrix, toMatrix(layer.coord));
  const localPoint = applyToPoint(inverse(selfMatrix), point);

  if (!isInLayer(layer, localPoint)) {
    return undefined;
  }

  const children = [...layer.children].reverse();
  for (const child of children) {
    const found = findLayer(child, selfMatrix, point);
    if (found) {
      return found;
    }
  }
  return layer;
};

export const findLayerAt = (root: Layer, point: Point) => {
  return findLayer(root, identity(), point);
};
