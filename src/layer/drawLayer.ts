import { Matrix, compose } from "transformation-matrix";

import { applyMatrix, identityMatrix, toMatrix } from "../coord/Coord";
import { DPR } from "../coord/DPR";

import { drawBoundingBox } from "./boundingBox/drawBoundingBox";
import { DrawOption } from "./DrawOption";
import { Layer } from "./Layer";

const drawlayerBg = (ctx: CanvasRenderingContext2D, layer: Layer) => {
  const { width, height } = layer.size;
  ctx.fillStyle = layer.color;
  ctx.fillRect(0, 0, width, height);
};

const drawLayerImpl = (
  ctx: CanvasRenderingContext2D,
  layer: Layer,
  matrix: Matrix,
  options: DrawOption
) => {
  const selfMatrix = compose(matrix, toMatrix(layer.coord));
  ctx.save();

  applyMatrix(ctx, selfMatrix);
  const scale = selfMatrix.a;

  drawlayerBg(ctx, layer);
  if (options.focusId === layer.id) {
    ctx.strokeStyle = "red";
    ctx.lineWidth = DPR / scale;
    ctx.strokeRect(0, 0, layer.size.width, layer.size.height);
  }

  if (layer.clip) {
    ctx.beginPath();
    ctx.rect(0, 0, layer.size.width, layer.size.height);
    ctx.clip();
  }

  layer.children.forEach((child) => {
    drawLayerImpl(ctx, child, selfMatrix, options);
  });

  ctx.restore();
};

export const drawLayer = (
  ctx: CanvasRenderingContext2D,
  layer: Layer,
  options: DrawOption = {}
) => {
  drawLayerImpl(ctx, layer, identityMatrix, options);

  if (options.selectedId) {
    drawBoundingBox(ctx, layer, options.selectedId);
  }
};
