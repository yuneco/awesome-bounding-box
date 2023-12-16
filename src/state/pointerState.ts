import { atom } from "jotai";

import { Coord } from "../coord/Coord";
import { Point } from "../coord/Point";

type BaseState = {
  lastCanvasPoint: Point;
  focusLayer: string | undefined;
  selectedLayer: string | undefined;
};

type DraggingState = Readonly<
  BaseState & {
    dragAction: "move" | "rotate" | "scale" | "none";
    focusLayer: string;
    selectedLayer: string;
    dragStartCanvasPoint: Point;
    dragStartCoord: Coord;
  }
>;

type MovingStateState = Readonly<
  BaseState & {
    dragAction: "none";
  }
>;

export type PointerState = DraggingState | MovingStateState;

export const INITIAL_POINTER_STATE: PointerState = {
  dragAction: "none",
  lastCanvasPoint: { x: 0, y: 0 },
  focusLayer: undefined,
  selectedLayer: undefined,
};

const pointerStateBaseAtom = atom<PointerState>(INITIAL_POINTER_STATE);

export const pointerStateAtom = atom((get) => {
  return get(pointerStateBaseAtom);
});

export const setPointerAction = atom(
  undefined,
  (get, set, state: PointerState) => {
    set(pointerStateBaseAtom, state);
  }
);
