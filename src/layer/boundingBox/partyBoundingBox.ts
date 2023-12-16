import { makeNoise2D } from "fast-simplex-noise";

import parrotPath from "../../assets/parrot.png";
import { drawCharAt } from "../../canvasUtils/draw";
import { drawSprite } from "../../canvasUtils/drawSprite";
import { loadImage } from "../../canvasUtils/loadImage";
import { DPR } from "../../coord/DPR";
import { addPoint, P_ZERO, Point } from "../../coord/Point";
import { expandRect, getRectCorners } from "../../coord/Rect";

import { RESIZE_HANDLE_NAMES } from "./boundingBoxLayout";
import {
  CustomBoundingBox,
  CustomBoundingBoxDraw,
  CustomBoundingBoxLayout,
} from "./CustomBoundingBox";

const parrot = loadImage(parrotPath);
const parrotTotalFrames = 10;

const getNoise = (seed: number, scale = 1): Point => {
  const noise = makeNoise2D(() => seed);
  const t = Date.now() / 120;
  const x = noise(t, 0) * DPR * scale;
  const y = noise(0, t) * DPR * scale;
  return { x, y };
};

const layout: CustomBoundingBoxLayout = (size, scale) => {
  const unit = DPR / scale;
  const padding = 2 * unit;
  const resizeRadius = 12 * unit;
  const rotateRadius = 12 * unit;

  const box = expandRect({ ...P_ZERO, ...size }, padding);
  const corners = getRectCorners(box);
  const handles = {
    "left-top": {
      center: addPoint(corners["left-top"], getNoise(1, 2)),
      radius: resizeRadius,
    },
    "right-top": {
      center: addPoint(corners["right-top"], getNoise(2, 2)),
      radius: resizeRadius,
    },
    "left-bottom": {
      center: addPoint(corners["left-bottom"], getNoise(3, 2)),
      radius: resizeRadius,
    },
    "right-bottom": {
      center: addPoint(corners["right-bottom"], getNoise(4, 2)),
      radius: resizeRadius,
    },
    rotate: {
      center: {
        x: box.x + box.width / 2,
        y: box.y - rotateRadius * 2,
      },
      radius: rotateRadius,
    },
  };
  return { box, handles };
};

const draw: CustomBoundingBoxDraw = (ctx, layer, scale, options) => {
  const { box, handles } = layout(layer.size, scale);

  const unit = DPR / scale;
  const time = Date.now() / 1000;
  const parrotFrame = Math.floor(time * 10) % parrotTotalFrames;

  ctx.save();

  // draw body box
  const wave = (time * 2) % 1;
  const expansion = wave * 3 * DPR;
  ctx.strokeStyle = `hsl(${time * 360 * 3}, 100%, 50%, ${1 - wave ** 3})`;
  for (let index = 0; index < 3; index++) {
    const bodyBox = expandRect(box, expansion / (index + 1));
    ctx.lineWidth = (expansion * (index + 1) * unit) / 3;
    ctx.beginPath();
    ctx.rect(bodyBox.x, bodyBox.y, bodyBox.width, bodyBox.height);
    ctx.stroke();
  }

  // draw resize handles
  RESIZE_HANDLE_NAMES.forEach((name) => {
    const handle = handles[name];
    ctx.font = `${(handle.radius * 2 * DPR) / scale}px sans-serif`;
    drawSprite(ctx, parrot, parrotTotalFrames, parrotFrame, {
      x: handle.center.x - handle.radius,
      y: handle.center.y - handle.radius,
      width: handle.radius * 2,
      height: handle.radius * 2,
    });
    // drawRectAt(ctx, handle.center, handle.radius);
  });

  // rotate handle
  ctx.beginPath();
  ctx.fillStyle = "red";
  const rotateHandle = handles["rotate"];
  ctx.font = `${rotateHandle.radius * DPR}px sans-serif`;
  drawCharAt(ctx, rotateHandle.center, "🍣", time * 360 * 2);
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

export const partyBoundingBox: CustomBoundingBox = {
  draw,
  layout,
};
