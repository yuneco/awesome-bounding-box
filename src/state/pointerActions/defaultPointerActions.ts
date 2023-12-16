import { atom } from "jotai";
import { PointerEvent } from "react";

import { RESIZE_HANDLE_NAMES } from "../../layer/boundingBox/boundingBoxLayout";
import { ev2point } from "../../utils/ev2point";
import { pointerStateAtom } from "../pointerState";

import { findHandleAction } from "./findHandleAction";
import { findLayerAction } from "./findLayerAction";
import { blurAction, focusAction } from "./focusAction";
import { continueMoveAction, startMoveAction } from "./moveAction";

const onMoveAction = atom(
  undefined,
  (get, set, ev: PointerEvent<HTMLElement>) => {
    const canvasP = ev2point(ev);
    const pointer = get(pointerStateAtom);
    const isDown = ev.buttons === 1 && pointer.dragAction !== "none";

    // just moving cursor
    if (!isDown) {
      const handle = set(findHandleAction, canvasP);
      const onHandle = handle && handle !== "body";
      document.body.style.cursor = onHandle ? "crosshair" : "default";
      if (onHandle) {
        console.log("handle", handle);
      }

      set(focusAction, canvasP);
      return;
    }

    // dragging
    set(continueMoveAction, canvasP);
  }
);

const onDownAction = atom(
  undefined,
  (get, set, ev: PointerEvent<HTMLElement>) => {
    const canvasP = ev2point(ev);
    const current = get(pointerStateAtom);

    const handle = set(findHandleAction, canvasP);
    const boundingTarget = handle ? current.selectedLayer : undefined;

    const found = set(findLayerAction, canvasP);
    // If the bounding box and the newly clicked item overlap, prioritize the latter
    const target = found?.layer ?? boundingTarget;
    if (!target) {
      set(blurAction);
      return;
    }

    if (handle && handle !== "body") {
      if (handle === "rotate") {
        console.log("rotate");
      } else if (RESIZE_HANDLE_NAMES.includes(handle)) {
        console.log("resize", handle);
      }
      return;
    }

    set(startMoveAction, canvasP, target);
  }
);

export const pointerActions = {
  onMoveAction,
  onDownAction,
};
