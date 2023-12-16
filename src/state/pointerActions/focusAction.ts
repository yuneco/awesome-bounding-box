import { atom } from "jotai";

import { Point } from "../../coord/Point";
import { pointerStateAtom, setPointerAction } from "../pointerState";

import { findLayerAtAction } from "./findLayerAction";

export const focusAction = atom(undefined, (get, set, canvasP: Point) => {
  const found = set(findLayerAtAction, canvasP);
  const current = get(pointerStateAtom);

  set(setPointerAction, {
    dragAction: "none",
    lastCanvasPoint: canvasP,
    focusLayer: found?.layer.id,
    selectedLayer: current.selectedLayer,
  });
});

export const blurAction = atom(undefined, (get, set) => {
  const current = get(pointerStateAtom);
  set(setPointerAction, {
    dragAction: "none",
    lastCanvasPoint: current.lastCanvasPoint,
    focusLayer: undefined,
    selectedLayer: current.selectedLayer,
  });
});
