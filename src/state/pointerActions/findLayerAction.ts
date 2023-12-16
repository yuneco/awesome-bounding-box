import { atom } from "jotai";
import { compose, applyToPoint, inverse } from "transformation-matrix";

import { toMatrix } from "../../coord/Coord";
import { Point } from "../../coord/Point";
import { findLayerAt } from "../../layer/findLayerAt";
import { findLayerById } from "../../layer/findLayerById";
import { Layer } from "../../layer/Layer";
import { getParentMatrix } from "../../layer/toLocal";
import { layerTreeAtom } from "../layerTreeState";

export type PointerTarget = {
  layer: Layer;
  localPoint: Point;
  parentPoint: Point;
};

export const findLayerAtAction = atom(
  undefined,
  (get, set, canvasPoint: Point): PointerTarget | undefined => {
    const root = get(layerTreeAtom);
    const layer = findLayerAt(root, canvasPoint);

    if (!layer) return undefined;

    const parentMatrix = getParentMatrix(root, layer.id);
    if (!parentMatrix) return undefined;
    const layerMatrix = compose(parentMatrix, toMatrix(layer.coord));
    if (!layerMatrix) return undefined;

    return {
      layer,
      localPoint: applyToPoint(inverse(layerMatrix), canvasPoint),
      parentPoint: applyToPoint(inverse(parentMatrix), canvasPoint),
    };
  }
);

export const findLayerByIdAction = atom(
  undefined,
  (get, set, layerId: string): Layer | undefined => {
    const root = get(layerTreeAtom);
    const layer = findLayerById(root, layerId);

    return layer;
  }
);
