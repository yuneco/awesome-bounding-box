import { applyToPoint } from "transformation-matrix";

import { Coord, toMatrix } from "../coord/Coord";
import { subPoint } from "../coord/Point";
import { Size } from "../coord/Size";

import { ResizeHanle } from "./boundingBox/boundingBoxLayout";

type SizeWithCoord = {
  size: Size;
  coord: Coord;
};

/**
 * get resized layer size and coord.
 * @param from current layer size and coord
 * @param handle handle to resize
 * @param diff resize amiunt
 * @returns resized layer size and coord
 */
export const resizeLayer = (
  from: SizeWithCoord,
  handle: ResizeHanle,
  diff: Size
): SizeWithCoord => {
  const fromAnchor = from.coord.anchor ?? { x: 0, y: 0 };
  const isLeft = handle === "left-bottom" || handle === "left-top";
  const isTop = handle === "left-top" || handle === "right-top";

  const toW = isLeft
    ? from.size.width - diff.width
    : from.size.width + diff.width;
  const toH = isTop
    ? from.size.height - diff.height
    : from.size.height + diff.height;

  const anchorXRatio = fromAnchor.x / from.size.width;
  const anchorYRatio = fromAnchor.y / from.size.height;
  const toAnchor = {
    x: toW * anchorXRatio,
    y: toH * anchorYRatio,
  };

  const coord = {
    ...from.coord,
    position: from.coord.position,
    anchor: toAnchor,
  };

  const size = { width: toW, height: toH };

  const fromResizeAnchor = {
    x: isLeft ? from.size.width : 0,
    y: isTop ? from.size.height : 0,
  };
  const fromResizeMatrix = toMatrix(from.coord);
  const fromResizePos = applyToPoint(fromResizeMatrix, fromResizeAnchor);
  const toResizeAnchor = {
    x: isLeft ? toW : 0,
    y: isTop ? toH : 0,
  };
  const toResizeMatrix = toMatrix(coord);
  const toResizePos = applyToPoint(toResizeMatrix, toResizeAnchor);
  const diffPos = subPoint(toResizePos, fromResizePos);

  const movedPos = subPoint(from.coord.position, diffPos);
  const movedCoord = {
    ...coord,
    position: movedPos,
  };

  return {
    size,
    coord: movedCoord,
  };
};
