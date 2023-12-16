import { atom } from "jotai";

import { Coord } from "../coord/Coord";
import { Point } from "../coord/Point";
import { Size } from "../coord/Size";
import { ResizeHanle } from "../layer/boundingBox/boundingBoxLayout";

type BaseState = {
  lastCanvasPoint: Point;
  focusLayer: string | undefined;
  selectedLayer: string | undefined;
};

type DragBaseState = Readonly<
  BaseState & {
    dragAction: "move" | "rotate" | "resize";
    focusLayer: string;
    selectedLayer: string;
    dragStartCanvasPoint: Point;
    dragStartCoord: Coord;
  }
>;

type DragMoveState = Readonly<
  DragBaseState & {
    dragAction: "move";
  }
>;

type DragRotateState = Readonly<
  DragBaseState & {
    dragAction: "rotate";
  }
>;

type DragResizeState = Readonly<
  DragBaseState & {
    dragAction: "resize";
    dragHandle: ResizeHanle;
    dragStartSize: Size;
  }
>;

type PointerHoverState = Readonly<
  BaseState & {
    dragAction: "none";
  }
>;

export type PointerState =
  | PointerHoverState
  | DragMoveState
  | DragRotateState
  | DragResizeState;

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
