import { DPR } from "../../coord/DPR";
import { P_ZERO, Point, distance } from "../../coord/Point";
import { expandRect, isInRect } from "../../coord/Rect";
import { Size } from "../../coord/Size";
import { Layer } from "../Layer";

import {
  BoundingBoxLayout,
  BoxElement,
  RESIZE_HANDLE_NAMES,
} from "./boundingBoxLayout";
import { BoundingDrawOption } from "./boundingDrawOption";

const layout = (size: Size, scale: number): BoundingBoxLayout => {
  const padding = (2 / scale) * DPR;
  const resizeRadius = (4 / scale) * DPR;
  const rotateRadius = (4 / scale) * DPR;

  const box = expandRect(
    {
      ...P_ZERO,
      ...size,
    },
    padding
  );
  const { x, y, width, height } = box;
  const handles = {
    "left-top": {
      center: { x: x, y: y },
      radius: resizeRadius,
    },
    "right-top": {
      center: { x: x + width, y: y },
      radius: resizeRadius,
    },
    "left-bottom": {
      center: { x: x, y: y + height },
      radius: resizeRadius,
    },
    "right-bottom": {
      center: { x: x + width, y: y + height },
      radius: resizeRadius,
    },
    rotate: {
      center: {
        x: x + width / 2,
        y: y - rotateRadius * 4,
      },
      radius: rotateRadius,
    },
  };
  return { box, handles };
};

const drawRectAt = (ctx: CanvasRenderingContext2D, point: Point, r: number) => {
  ctx.rect(point.x - r, point.y - r, r * 2, r * 2);
};
const drawCircleAt = (
  ctx: CanvasRenderingContext2D,
  point: Point,
  r: number
) => {
  ctx.arc(point.x, point.y, r, 0, Math.PI * 2);
};

const draw = (
  ctx: CanvasRenderingContext2D,
  layer: Layer,
  scale: number,
  options: BoundingDrawOption
) => {
  const { box, handles } = layout(layer.size, scale);

  ctx.save();
  ctx.strokeStyle = "red";
  ctx.lineWidth = DPR / scale;

  ctx.beginPath();
  ctx.rect(box.x, box.y, box.width, box.height);
  RESIZE_HANDLE_NAMES.forEach((name) => {
    const handle = handles[name];
    drawRectAt(ctx, handle.center, handle.radius * 0.7);
  });
  ctx.stroke();

  // rotate handle
  ctx.beginPath();
  ctx.fillStyle = "red";
  const rotateHandle = handles["rotate"];
  drawCircleAt(ctx, rotateHandle.center, rotateHandle.radius);
  ctx.fill();

  if (options.dragAction === "resize") {
    // draw layer size label
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    const LABEL_FONT_SIZE = 8;
    ctx.font = `${(LABEL_FONT_SIZE * DPR) / scale}px sans-serif`;
    // draw width on top
    ctx.fillText(
      `${Math.round(layer.size.width)}`,
      box.x + box.width / 2,
      box.y + box.height + ((LABEL_FONT_SIZE * DPR) / scale) * 1.4
    );
    // draw height on right
    ctx.rotate(Math.PI / 2);
    ctx.translate(box.height, -box.width);
    ctx.fillText(
      `${Math.round(layer.size.height)}`,
      -(box.y + box.height / 2),
      box.x + ((LABEL_FONT_SIZE * DPR) / scale) * 0.2
    );
  }

  ctx.restore();
};

const findHandle = (
  layer: Layer,
  point: Point,
  scale: number
): BoxElement | undefined => {
  const { box, handles } = layout(layer.size, scale * DPR);

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

export const basicBoundingBox = {
  draw,
  layout,
  findHandle,
};
