import { drawRectAt, drawCircleAt } from "../../canvasUtils/draw";
import { DPR } from "../../coord/DPR";
import { P_ZERO } from "../../coord/Point";
import { expandRect, getRectCorners } from "../../coord/Rect";

import { RESIZE_HANDLE_NAMES } from "./boundingBoxLayout";
import {
  CustomBoundingBox,
  CustomBoundingBoxDraw,
  CustomBoundingBoxLayout,
} from "./CustomBoundingBox";

const layout: CustomBoundingBoxLayout = (size, scale) => {
  const unit = DPR / scale;
  const padding = 2 * unit;
  const resizeRadius = 4 * unit;
  const rotateRadius = 4 * unit;

  const box = expandRect({ ...P_ZERO, ...size }, padding);
  const corners = getRectCorners(box);
  const handles = {
    "left-top": {
      center: corners["left-top"],
      radius: resizeRadius,
    },
    "right-top": {
      center: corners["right-top"],
      radius: resizeRadius,
    },
    "left-bottom": {
      center: corners["left-bottom"],
      radius: resizeRadius,
    },
    "right-bottom": {
      center: corners["right-bottom"],
      radius: resizeRadius,
    },
    rotate: {
      center: {
        x: box.x + box.width / 2,
        y: box.y - rotateRadius * 4,
      },
      radius: rotateRadius,
    },
  };
  return { box, handles };
};

const draw: CustomBoundingBoxDraw = (ctx, layer, scale, options) => {
  const { box, handles } = layout(layer.size, scale);

  const mainColor = "#66aabb";
  const unit = DPR / scale;

  ctx.save();

  // body rect
  ctx.beginPath();
  ctx.rect(box.x, box.y, box.width, box.height);
  ctx.lineWidth = unit * 3;
  ctx.strokeStyle = "white";
  ctx.stroke();
  ctx.lineWidth = unit * 1;
  ctx.strokeStyle = mainColor;
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = mainColor;
  ctx.lineWidth = unit * 2;
  ctx.fillStyle = "white";
  RESIZE_HANDLE_NAMES.forEach((name) => {
    const handle = handles[name];
    drawRectAt(ctx, handle.center, handle.radius * 0.7);
  });
  ctx.stroke();
  ctx.fill();

  // rotate handle
  ctx.beginPath();
  ctx.fillStyle = mainColor;
  ctx.strokeStyle = "white";
  ctx.lineWidth = unit;
  const rotateHandle = handles["rotate"];
  drawCircleAt(ctx, rotateHandle.center, rotateHandle.radius);
  ctx.fill();
  ctx.stroke();

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

export const basicBoundingBox: CustomBoundingBox = {
  draw,
  layout,
};
