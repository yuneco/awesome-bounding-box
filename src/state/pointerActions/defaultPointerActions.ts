import { atom } from "jotai";
import { PointerEvent } from "react";

import {
  BoxElement,
  RESIZE_HANDLE_NAMES,
} from "../../layer/boundingBox/boundingBoxLayout";
import { ev2point } from "../../utils/ev2point";
import { pointerStateAtom, setPointerAction } from "../pointerState";

import { findHandleAction } from "./findHandleAction";
import { findLayerAtAction, findLayerByIdAction } from "./findLayerAction";
import { blurAction, focusAction } from "./focusAction";
import { continueMoveAction, startMoveAction } from "./moveAction";
import { continueResizeAction, startResizeAction } from "./resizeAction";
import { continueRotateAction, startRotateAction } from "./rotateAction";

const changeCursor = (handle?: BoxElement) => {
  const cursors = {
    "left-top": "crosshair",
    "right-top": "crosshair",
    "right-bottom": "crosshair",
    "left-bottom": "crosshair",
    rotate: "crosshair",
    body: "move",
  } as const satisfies { [key in BoxElement]: string };
  document.body.style.cursor = handle ? cursors[handle] : "default";
};

const onMoveAction = atom(
  undefined,
  (get, set, ev: PointerEvent<HTMLElement>) => {
    const canvasP = ev2point(ev);
    const pointer = get(pointerStateAtom);
    const isDown = ev.buttons === 1 && pointer.dragAction !== "none";

    // just moving cursor
    if (!isDown) {
      const handle = set(findHandleAction, canvasP);
      changeCursor(handle);

      set(focusAction, canvasP);
      return;
    }

    // dragging
    switch (pointer.dragAction) {
      case "rotate":
        set(continueRotateAction, canvasP);
        break;
      case "move":
        set(continueMoveAction, canvasP);
        break;
      case "resize":
        set(continueResizeAction, canvasP);
        break;
    }
  }
);

const onDownAction = atom(
  undefined,
  (get, set, ev: PointerEvent<HTMLElement>) => {
    const canvasP = ev2point(ev);
    const current = get(pointerStateAtom);

    const handle = set(findHandleAction, canvasP);
    const boundingId = handle ? current.selectedLayer : undefined;
    const boundingLayer = boundingId
      ? set(findLayerByIdAction, boundingId)
      : undefined;

    const found = set(findLayerAtAction, canvasP);
    // If the bounding box and the newly clicked item overlap, prioritize the latter
    const target = found?.layer ?? boundingLayer;
    if (!target) {
      set(blurAction, true);
      return;
    }

    if (handle && handle !== "body" && boundingLayer) {
      if (handle === "rotate") {
        set(startRotateAction, canvasP, boundingLayer);
      } else if (RESIZE_HANDLE_NAMES.includes(handle)) {
        set(startResizeAction, canvasP, boundingLayer, handle);
      }
      return;
    }

    set(startMoveAction, canvasP, target);
  }
);

const onUpAction = atom(
  undefined,
  (get, set, ev: PointerEvent<HTMLElement>) => {
    const canvasP = ev2point(ev);
    const current = get(pointerStateAtom);
    set(setPointerAction, {
      dragAction: "none",
      lastCanvasPoint: canvasP,
      focusLayer: undefined,
      selectedLayer: current.selectedLayer,
    });
    set(focusAction, canvasP);
  }
);

export const pointerActions = {
  onMoveAction,
  onDownAction,
  onUpAction,
};
