import { DPR } from "./DPR";
import { Point } from "./Point";

export const dom2canvasPoint = (p: Point): Point => {
  return {
    x: p.x * DPR,
    y: p.y * DPR,
  };
};
