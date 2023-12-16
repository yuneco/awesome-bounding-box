import { atom } from "jotai";
import { applyToPoint, inverse } from "transformation-matrix";

import { Point, addPoint, subPoint } from "../../coord/Point";
import { Layer } from "../../layer/Layer";
import { getParentWithMatrix } from "../../layer/toLocal";
import { layerTreeAtom, updateLayerAction } from "../layerTreeState";
import { pointerStateAtom, setPointerAction } from "../pointerState";

import { findLayerByIdAction } from "./findLayerAction";

export const startMoveAction = atom(
  undefined,
  (get, set, canvasP: Point, target: Layer) => {
    set(setPointerAction, {
      dragAction: "move",
      lastCanvasPoint: canvasP,
      focusLayer: target.id,
      selectedLayer: target.id,
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

    const targetId = pointer.selectedLayer;
    const moveDiff = subPoint(canvasP, pointer.dragStartCanvasPoint);

    const targetLayer = set(findLayerByIdAction, targetId);
    const parent = getParentWithMatrix(get(layerTreeAtom), targetId);
    const parentMatrix = parent?.matrix;
    if (!targetLayer || !parentMatrix) return;
    const posZero = applyToPoint(inverse(parentMatrix), { x: 0, y: 0 });
    const posMove = applyToPoint(inverse(parentMatrix), moveDiff);
    const move = addPoint(
      pointer.dragStartCoord.position,
      subPoint(posMove, posZero)
    );

    // move target
    set(updateLayerAction, pointer.selectedLayer, {
      coord: {
        ...targetLayer.coord,
        position: move,
      },
    });
  }
);
