type Fn = () => void;

export const wrapCtx = (ctx: CanvasRenderingContext2D, fn: Fn) => {
  ctx.save();
  fn();
  ctx.restore();
};
