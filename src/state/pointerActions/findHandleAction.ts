import { atom } from "jotai";

import { Point } from "../../coord/Point";
import { getBoundinfBoxHandleAt } from "../../layer/boundingBox/drawBoundingBox";
import { layerTreeAtom } from "../layerTreeState";
import { pointerStateAtom } from "../pointerState";

/**
 * Find current bounding box handle at the point.
 */
export const findHandleAction = atom(undefined, (get, set, canvasP: Point) => {
  const pointer = get(pointerStateAtom);

  if (!pointer.selectedLayer) {
    return undefined;
  }
  const root = get(layerTreeAtom);
  return getBoundinfBoxHandleAt(canvasP, root, pointer.selectedLayer);
});
