import { Point, distance } from "../../coord/Point";
import { isInRect } from "../../coord/Rect";

import {
  BoundingBoxLayout,
  BoxElement,
  RESIZE_HANDLE_NAMES,
} from "./boundingBoxLayout";

export const findHandleInLayout = (
  layout: BoundingBoxLayout,
  point: Point
): BoxElement | undefined => {
  const { box, handles } = layout;

  // rotate handle
  const rotateHandle = handles["rotate"];

  if (distance(point, rotateHandle.center) <= rotateHandle.radius) {
    return "rotate";
  }

  // resize handles
  const resizeHandle = RESIZE_HANDLE_NAMES.find((name) => {
    const handle = handles[name];
    return distance(point, handle.center) <= handle.radius;
  });
  if (resizeHandle) return resizeHandle;

  // box
  if (isInRect(box, point)) return "body";

  return undefined;
};
