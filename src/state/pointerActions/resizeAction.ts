import { atom } from "jotai";
import { applyToPoint, inverse } from "transformation-matrix";

import { Point, subPoint } from "../../coord/Point";
import { pointToSize } from "../../coord/Size";
import { ResizeHanle } from "../../layer/boundingBox/boundingBoxLayout";
import { Layer } from "../../layer/Layer";
import { resizeLayer } from "../../layer/resizeLayer";
import { getLayerWithMatrix } from "../../layer/toLocal";
import { layerTreeAtom, updateLayerAction } from "../layerTreeState";
import { pointerStateAtom, setPointerAction } from "../pointerState";

export const startResizeAction = atom(
  undefined,
  (get, set, canvasP: Point, target: Layer, handle: ResizeHanle) => {
    set(setPointerAction, {
      dragAction: "resize",
      lastCanvasPoint: canvasP,
      focusLayer: target.id,
      selectedLayer: target.id,
      dragStartCanvasPoint: canvasP,
      dragStartCoord: target.coord,
      dragHandle: handle,
      dragStartSize: target.size,
    });
  }
);

export const continueResizeAction = atom(
  undefined,
  (get, set, canvasP: Point) => {
    const pointer = get(pointerStateAtom);
    if (pointer.dragAction !== "resize") {
      return;
    }

    set(setPointerAction, {
      ...pointer,
      lastCanvasPoint: canvasP,
    });

    const target = pointer.selectedLayer;

    const self = getLayerWithMatrix(get(layerTreeAtom), target);
    if (!self) return;
    const localToP = applyToPoint(inverse(self.matrix), canvasP);
    const localFromP = applyToPoint(
      inverse(self.matrix),
      pointer.dragStartCanvasPoint
    );

    const diff = pointToSize(subPoint(localToP, localFromP));

    const startSizeAndCoord = {
      size: pointer.dragStartSize,
      coord: pointer.dragStartCoord,
    };
    const update = resizeLayer(startSizeAndCoord, pointer.dragHandle, diff);
    set(updateLayerAction, self.layer.id, update);
  }
);
