import { atom } from "jotai";

import { Coord } from "../coord/Coord";
import { Point } from "../coord/Point";
import { Layer } from "../layer/Layer";

type BaseState = {
  lastCanvasPoint: Point;
  focusLayer: Layer | undefined;
  selectedLayer: Layer | undefined;
};

type DraggingState = BaseState & {
  dragAction: "move" | "rotate" | "scale" | "none";
  focusLayer: Layer;
  selectedLayer: Layer;
  dragStartCanvasPoint: Point;
  dragStartCoord: Coord;
};

type MovingStateState = BaseState & {
  dragAction: "none";
};

export type PointerState = DraggingState | MovingStateState;

const pointerStateBaseAtom = atom<PointerState>({
  dragAction: "none",
  lastCanvasPoint: { x: 0, y: 0 },
  focusLayer: undefined,
  selectedLayer: undefined,
});

export const pointerStateAtom = atom((get) => {
  return get(pointerStateBaseAtom);
});

export const setPointerAction = atom(
  undefined,
  (get, set, state: PointerState) => {
    set(pointerStateBaseAtom, state);
  }
);
