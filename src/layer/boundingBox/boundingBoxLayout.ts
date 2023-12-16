import { Point } from "../../coord/Point";
import { RECT_CORNER, Rect } from "../../coord/Rect";

export const RESIZE_HANDLE_NAMES = RECT_CORNER;
export const ROTATE_HANDLE_NAME = "rotate";
export const BOX_BODY = "body";

export type ResizeHanle = (typeof RESIZE_HANDLE_NAMES)[number];
export type RotateHandle = typeof ROTATE_HANDLE_NAME;
export type BoxBody = typeof BOX_BODY;

export type BoxHandle = ResizeHanle | RotateHandle;
export type BoxElement = BoxHandle | BoxBody;

export type BoundingBoxLayout = {
  box: Rect;
  handles: {
    [key in BoxHandle]: {
      center: Point;
      radius: number;
    };
  };
};
