import { Size } from "../../coord/Size";
import { Layer } from "../Layer";

import { BoundingBoxLayout } from "./boundingBoxLayout";
import { BoundingDrawOption } from "./boundingDrawOption";

export type CustomBoundingBoxLayout = (
  size: Size,
  scale: number
) => BoundingBoxLayout;

export type CustomBoundingBoxDraw = (
  ctx: CanvasRenderingContext2D,
  layer: Layer,
  scale: number,
  option: BoundingDrawOption
) => void;

export type CustomBoundingBox = {
  layout: CustomBoundingBoxLayout;
  draw: CustomBoundingBoxDraw;
};
