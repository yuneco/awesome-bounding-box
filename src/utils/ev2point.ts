import { PointerEvent } from "react";

import { Point } from "../coord/Point";

export const ev2point = (ev: PointerEvent<HTMLElement>): Point => ({
  x: ev.nativeEvent.offsetX,
  y: ev.nativeEvent.offsetY,
});
