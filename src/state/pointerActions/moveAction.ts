import { atom } from "jotai";
import { applyToPoint, inverse } from "transformation-matrix";

import { Point, addPoint, subPoint } from "../../coord/Point";
import { Layer } from "../../layer/Layer";
import { getParentMatrix } from "../../layer/toLocal";
import { layerTreeAtom, updateLayerAction } from "../layerTreeState";
import { pointerStateAtom, setPointerAction } from "../pointerState";

export const startMoveAction = atom(
  undefined,
  (get, set, canvasP: Point, target: Layer) => {
    set(setPointerAction, {
      dragAction: "move",
      lastCanvasPoint: canvasP,
      focusLayer: target,
      selectedLayer: target,
      dragStartCanvasPoint: canvasP,
      dragStartCoord: target.coord,
    });
  }
);

export const continueMoveAction = atom(
  undefined,
  (get, set, canvasP: Point) => {
    const pointer = get(pointerStateAtom);
    if (pointer.dragAction !== "move") {
      return;
    }

    set(setPointerAction, {
      dragAction: pointer.dragAction,
      lastCanvasPoint: canvasP,
      focusLayer: pointer.focusLayer,
      selectedLayer: pointer.selectedLayer,
      dragStartCanvasPoint: pointer.dragStartCanvasPoint,
      dragStartCoord: pointer.dragStartCoord,
    });

    const target = pointer.selectedLayer;
    const moveDiff = subPoint(canvasP, pointer.dragStartCanvasPoint);
    const parentMatrix = getParentMatrix(get(layerTreeAtom), target.id);
    if (!parentMatrix) return;
    const posZero = applyToPoint(inverse(parentMatrix), { x: 0, y: 0 });
    const posMove = applyToPoint(inverse(parentMatrix), moveDiff);
    const move = addPoint(
      pointer.dragStartCoord.position,
      subPoint(posMove, posZero)
    );

    // move target
    set(updateLayerAction, pointer.selectedLayer.id, {
      coord: {
        ...target.coord,
        position: move,
      },
    });
  }
);
