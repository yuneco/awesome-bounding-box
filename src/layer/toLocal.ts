import { Matrix, applyToPoint, compose, identity } from "transformation-matrix";

import { toMatrix } from "../coord/Coord";
import { Point } from "../coord/Point";

import { findLayerPathById } from "./findLayerById";
import { Layer } from "./Layer";

export const getParentMatrix = (
  root: Layer,
  id: string
): Matrix | undefined => {
  const path = findLayerPathById(root, id);
  if (!path) {
    return undefined;
  }
  const target = path.pop();
  if (!target) {
    return undefined;
  }
  // target is root
  if (path.length === 0) {
    return identity();
  }

  // get parent matrix
  return path.reduce(
    (acc, layer) => compose(acc, toMatrix(layer.coord)),
    identity()
  );
};

/**
 * transform global point to target's parent local point.
 * @param root root layer
 * @param id target layer id
 * @param gp global point
 * @returns taget layer parent's local point
 */
export const toParentLocal = (
  root: Layer,
  id: string,
  gp: Point
): Point | undefined => {
  const matrix = getParentMatrix(root, id);
  if (!matrix) {
    return undefined;
  }
  return applyToPoint(matrix, gp);
};
