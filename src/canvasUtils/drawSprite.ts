import { Rect } from "../coord/Rect";

export const drawSprite = (
  ctx: CanvasRenderingContext2D,
  source: HTMLImageElement,
  totalFrames: number,
  drawIndex: number,
  toArea: Rect
) => {
  const sourceWidth = source.width / totalFrames;
  const sourceHeight = source.height;
  const sourceX = sourceWidth * drawIndex;
  const sourceY = 0;

  ctx.drawImage(
    source,
    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,
    toArea.x,
    toArea.y,
    toArea.width,
    toArea.height
  );
};
