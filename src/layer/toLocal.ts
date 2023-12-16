import { Matrix, compose, identity } from "transformation-matrix";

import { toMatrix } from "../coord/Coord";

import { findLayerPathById } from "./findLayerById";
import { Layer } from "./Layer";

export const getLayerWithMatrix = (root: Layer, layerId: string) => {
  const path = findLayerPathById(root, layerId);
  if (!path) return;
  const layer = path[path.length - 1];
  if (!layer) return;

  const matrix = path.reduce((acc, layer) => {
    return compose(acc, toMatrix(layer.coord));
  }, identity());

  return { matrix, layer };
};

export const getParentWithMatrix = (root: Layer, layerId: string) => {
  const path = findLayerPathById(root, layerId);
  if (!path) return;
  const layer = path.pop();
  if (!layer) return;
  if (path.length === 0) {
    return {
      layer,
      matrix: identity(),
    };
  }
  const matrix = path.reduce((acc, layer) => {
    return compose(acc, toMatrix(layer.coord));
  }, identity());

  return { matrix, layer };
};

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
