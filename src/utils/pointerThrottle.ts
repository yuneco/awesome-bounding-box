import { PointerEvent } from "react";

export const createPointerThrottle = (margin = 1) => {
  let lastP = { x: 0, y: 0 };

  /**
   * @returns true if the pointer is moved more than the margin
   */
  return (ev: PointerEvent) => {
    const dx = ev.clientX - lastP.x;
    const dy = ev.clientY - lastP.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    const isMoved = d >= margin;
    if (!isMoved) return false;
    lastP = { x: ev.clientX, y: ev.clientY };
    return true;
  };
};
