const colorLight = "#f0f0f0";
const colorDark = "#e8e8e8";

const checkSize = 25;

export const drawBgCheck = (ctx: CanvasRenderingContext2D) => {
  ctx.save();
  ctx.resetTransform();

  const { width, height } = ctx.canvas;

  // fill whole canvas with light color
  ctx.fillStyle = colorLight;
  ctx.fillRect(0, 0, width, height);

  // draw dark check pattern
  ctx.beginPath();
  ctx.fillStyle = colorDark;

  const xCount = Math.ceil(width / checkSize);
  const yCount = Math.ceil(height / checkSize);

  for (let x = 0; x < xCount; x++) {
    for (let y = 0; y < yCount; y++) {
      if ((x + y) % 2 === 0) {
        ctx.rect(x * checkSize, y * checkSize, checkSize, checkSize);
      }
    }
  }
  ctx.fill();

  ctx.restore();
};
