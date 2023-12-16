import { atom } from "jotai";
import { applyToPoint, inverse } from "transformation-matrix";

import {
  P_ZERO,
  Point,
  anglePoints,
  normalizeAngle,
  subPoint,
} from "../../coord/Point";
import { Layer } from "../../layer/Layer";
import { getLayerWithMatrix } from "../../layer/toLocal";
import { layerTreeAtom, updateLayerAction } from "../layerTreeState";
import { pointerStateAtom, setPointerAction } from "../pointerState";

export const startRotateAction = atom(
  undefined,
  (get, set, canvasP: Point, target: Layer) => {
    set(setPointerAction, {
      dragAction: "rotate",
      lastCanvasPoint: canvasP,
      focusLayer: target.id,
      selectedLayer: target.id,
      dragStartCanvasPoint: canvasP,
      dragStartCoord: target.coord,
    });
  }
);

export const continueRotateAction = atom(
  undefined,
  (get, set, canvasP: Point) => {
    const pointer = get(pointerStateAtom);
    if (pointer.dragAction !== "rotate") {
      return;
    }

    set(setPointerAction, {
      ...pointer,
      lastCanvasPoint: canvasP,
    });

    const target = pointer.selectedLayer;

    const self = getLayerWithMatrix(get(layerTreeAtom), target);
    if (!self) return;
    const localP = applyToPoint(inverse(self.matrix), canvasP);
    const localStartP = applyToPoint(
      inverse(self.matrix),
      pointer.dragStartCanvasPoint
    );

    const anchor = pointer.dragStartCoord.anchor ?? P_ZERO;
    const start = subPoint(localStartP, anchor);
    const move = subPoint(localP, anchor);

    const angle = normalizeAngle(
      pointer.dragStartCoord.angle + anglePoints(start, move)
    );

    // rotate target
    set(updateLayerAction, pointer.selectedLayer, {
      coord: {
        ...self.layer.coord,
        angle,
      },
    });
  }
);
