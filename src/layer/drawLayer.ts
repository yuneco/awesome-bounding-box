import { Matrix, compose, decomposeTSR } from "transformation-matrix";

import { applyMatrix, identityMatrix, toMatrix } from "../coord/Coord";
import { DPR } from "../coord/DPR";
import { P_ZERO } from "../coord/Point";
import { expandRect } from "../coord/Rect";
import { findImage } from "../state/layerImageState";

import { drawBoundingBox } from "./boundingBox/drawBoundingBox";
import { DrawOption } from "./DrawOption";
import { Layer } from "./Layer";

const drawlayerBg = (
  ctx: CanvasRenderingContext2D,
  layer: Layer,
  unit: number,
  isRoot: boolean,
  isSelected: boolean
) => {
  const { width, height } = layer.size;

  // add shadow if selected
  const hasShadow = isSelected && !isRoot;
  if (hasShadow) {
    ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
    ctx.shadowBlur = 48 * unit;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  ctx.fillStyle = layer.color;
  ctx.fillRect(0, 0, width, height);

  ctx.shadowColor = "transparent";

  if (!isRoot) {
    const img = findImage(layer.id);

    const isImgLoading = img && img.complete === false;
    if (isImgLoading) {
      ctx.fillStyle = "gray";
      ctx.font = `${12 * unit}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("loading...", width / 2, height / 2);
    }

    if (img) {
      ctx.drawImage(img, 0, 0, width, height);
    }
  }
};

const drawLayerImpl = (
  ctx: CanvasRenderingContext2D,
  layer: Layer,
  matrix: Matrix,
  options: DrawOption,
  isRoot: boolean
) => {
  const selfMatrix = compose(matrix, toMatrix(layer.coord));
  ctx.save();

  applyMatrix(ctx, selfMatrix);
  const tr = decomposeTSR(selfMatrix);
  const scale = tr.scale.sx;
  const unit = DPR / scale;

  const focused = options.focusId === layer.id;
  const selected = options.selectedId === layer.id;

  drawlayerBg(ctx, layer, unit, isRoot, selected);

  if (focused && !selected) {
    ctx.strokeStyle = "#7799a8";
    ctx.setLineDash([unit * 2, unit * 2]);
    ctx.lineWidth = DPR / scale;
    const rect = expandRect({ ...P_ZERO, ...layer.size }, unit * 2);
    ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
  }

  if (layer.clip) {
    ctx.beginPath();
    ctx.rect(0, 0, layer.size.width, layer.size.height);
    ctx.clip();
  }

  layer.children.forEach((child) => {
    drawLayerImpl(ctx, child, selfMatrix, options, false);
  });

  ctx.restore();
};

export const drawLayer = (
  ctx: CanvasRenderingContext2D,
  layer: Layer,
  options: DrawOption = {}
) => {
  drawLayerImpl(ctx, layer, identityMatrix, options, true);

  if (options.selectedId) {
    drawBoundingBox(ctx, layer, options.selectedId, options.boundingOptions);
  }
};
